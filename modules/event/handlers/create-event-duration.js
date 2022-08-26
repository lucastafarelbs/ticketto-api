import dateUtils from '../../../utils/date.js'
const handler = async function (request, reply) {
  try {
    const { 
      description,
      begin,
      end
    } = request.body

    const eventId = request.params.eventId

    if (!begin) return reply.code(403).send('Begin date is required.')

    const beginUTC = dateUtils.dateTimeToUTC(begin)
    if (!beginUTC) return reply.code(403).send('Begin date expects YYYY-MM-DDTHH:mm or YYYY-MM-DD HH:mm ')
    
    const endUTC = end ? dateUtils.dateTimeToUTC(end) : null
    if (end && !endUTC) return reply.code(403).send('End date expects YYYY-MM-DDTHH:mm or YYYY-MM-DD HH:mm ')

    await this
      .dbConnection('event_duration')
      .insert( { 
        event_id: eventId,
        description: description,
        begin: beginUTC,
        end: endUTC
      })

    reply.send('created')
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
