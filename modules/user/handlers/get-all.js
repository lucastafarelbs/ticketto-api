const handler = async function (request, reply) {
  try {
    const found = await this.dbConnection('user')
    reply.send(found)
  } catch (error) {
    throw error
  }
}

export default handler
