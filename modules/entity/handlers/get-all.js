const handler = async function (request, reply) {
  try {
    const found = await this.dbConnection('entity')
    reply.send(found)
  } catch (error) {
    console.log(error)
    reply.send('can\'t get.')
  }
}

export default handler
