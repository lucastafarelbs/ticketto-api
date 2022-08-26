const handler = async function (request, reply) {
  try {
    const { 
      entityId,
      eventTypeId,
      description,
      minimalAge,
      url
    } = request.body

    await this
      .dbConnection('event')
      .insert( { 
        entity_id: entityId,
        event_type_id: eventTypeId,
        description,
        minimal_age: minimalAge,
        url
      })

    reply.send('created')
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
