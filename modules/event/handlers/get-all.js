const handler = async function (request, reply) {
  try {
    const found = await this
      .dbConnection('event')
      .join('event_type', 'event_type.id', '=', 'event.event_type_id')
    reply.send(found)
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t get.')
  }
}

export default handler
