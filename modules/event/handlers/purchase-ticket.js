import jwt from 'jsonwebtoken'

const validCreditCardInfo = creditCardInfo => {
  return !!creditCardInfo 
    && creditCardInfo.number
    && creditCardInfo.name
    && creditCardInfo.code
    && creditCardInfo.validThru
}

const validCustomerInfo = customerInfo => {
  return !!customerInfo 
    && customerInfo.document
    && customerInfo.name
}

const paymentGatewayService = async (creditCardInfo, customerInfo, paymentMethod/*, price*/) => {
  if (!validCustomerInfo(customerInfo)) return {status: 400, message: 'Invalid customer informations.'}

  if (!paymentMethod) return {status: 400, message: 'Invalid paymentMethod.'}
  
  if (paymentMethod.toString() === '2') {
    return {status: 201, message: 'https://fakeurl.com/bank/37183'}
  }

  if (paymentMethod.toString() === '1' && !validCreditCardInfo(creditCardInfo)) return { status: 400, message: 'Invalid credit card informations.' }
  
  if (creditCardInfo.number.toString() ==='123') return { status: 403, message: 'Refused credit card.'}

  return {status: 201, message: 'Done.'}
}

const handler = async function (request, reply) {
  try {
    const { 
      paymentMethodId,
      creditCardInfo,
      customerInfo
    } = request.body
    
    const ticketId = request.params.ticketId

    const token = request.headers.authorization
    if (!token) return reply.code(401).send()
    
    const validToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!validToken || !Object.keys(validToken).length) return reply.code(401).send()

    const paymentMethod = await this
      .dbConnection('payment_method')
      .where('id', '=', paymentMethodId)
      .first()

    if (!paymentMethod || !Object.keys(paymentMethod).length) {
      return reply.code(400).send('Invalid payment method.')
    }

    if (paymentMethod.id === '1' && (!creditCardInfo || !Object.keys(creditCardInfo).length)) {
      return reply.code(400).send('creditCardInfo is required for this payment method.')
    }
    
    if (!validCreditCardInfo(creditCardInfo)) {
      return reply.code(400).send('Invalid creditCardInfo.')
    }

    const ticketInfo = await this
      .dbConnection('ticket')
      .where('id', '=', ticketId)
      .first()

    if (!ticketInfo || !Object.keys(ticketInfo).length) {
      return reply.code(404).send('Ticket not found.')
    }
    
    const validStatusIds = [2, 4]
    const purchasedTickets = await this
      .dbConnection('payment')
      .count('id as quantity')
      .where('payment_status_id', 'in', validStatusIds)
      .first()

    if (parseInt(purchasedTickets.quantity) >= ticketInfo.limit) {
      return reply.code(400).send('Tickets sold out.')
    }

    const integrationResponse = await paymentGatewayService(creditCardInfo, customerInfo, paymentMethodId /*, ticketInfo.price, */)
    
    if (integrationResponse.status < 200 || integrationResponse.status > 299) {
      return reply.code(400).send(`Refused payment: ${ integrationResponse.message }`)
    }

    const paymentStatusId = integrationResponse.message.includes('http')
      ? 2
      : 4
    
    await this.dbConnection.transaction(async trx => {
      const now = new Date()
      const payment = await trx('payment').insert({
          payment_method_id: paymentMethodId,
          payment_status_id: paymentStatusId,
          description: 'teste',
          created_at: now
        },
        ['id']
      ) 
      await trx('ticket_user').insert({
        payment_id: payment[0].id,
        ticket_id: ticketId,
        user_id: validToken.userId,
        created_at: now
      })

      const messages = {
        2: `Ticket successfully reserved, pay it in up to 3 days, after that it will be canceled.  ${integrationResponse.message}`,
        default: 'Ticket successfully purchased.'
      }

      reply.send(messages[paymentStatusId] || messages.default)
    })
  } catch (error) {
    console.log('caiu aqui')
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
