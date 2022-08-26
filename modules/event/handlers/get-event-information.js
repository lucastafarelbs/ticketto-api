const handler = async function (request, reply) {
  try {
    const eventId = request.params.eventId
    const found = await this
      .dbConnection('event_information')
      .where('event_id', '=', eventId)
    reply.send(found)
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t get.')
  }
}

export default handler
