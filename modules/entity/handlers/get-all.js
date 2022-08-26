const handler = async function (request, reply) {
  try {
    const found = await this
      .dbConnection('entity')
      .join('entity_type', 'entity_type.id', '=', 'entity.entity_type_id')
    reply.send(found)
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t get.')
  }
}

export default handler
