const handler = async function (request, reply) {
  try {
    const { 
      name, 
      document,
      entityTypeId
    } = request.body

    await this
      .dbConnection('entity')
      .insert( { 
        name, 
        document,
        entity_type_id: entityTypeId
      })

    reply.send('created')
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
