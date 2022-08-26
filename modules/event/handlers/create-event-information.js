const handler = async function (request, reply) {
  try {
    const { 
      description,
      content
    } = request.body

   const eventId = request.params.eventId
   await this
     .dbConnection('event_information')
     .insert( { 
       event_id: eventId,
       description: description,
       content
     })

    reply.send('created')
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
