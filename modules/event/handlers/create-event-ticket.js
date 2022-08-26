const handler = async function (request, reply) {
  try {
    const { 
      description,
      price,
      limit
    } = request.body

    if (!description || !price || !limit) {
      return reply.code(403).send('The fields description, price and limit are required.')
    }

   const eventId = request.params.eventId
   await this
     .dbConnection('ticket')
     .insert( { 
       event_id: eventId,
       description,
       price,
       limit
     })

    reply.send('created')
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
