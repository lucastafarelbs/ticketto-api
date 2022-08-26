const handler = async function (request, reply) {
  try {
    const found = await this
      .dbConnection('event_type')
    reply.send(found)
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t get.')
  }
}

export default handler
