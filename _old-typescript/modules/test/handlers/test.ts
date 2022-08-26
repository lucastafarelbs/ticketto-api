const handler: Function = async function (this: any, _: any, reply: any) {
  const table: string = 'teste'
  const all: any = await this.dbConnection(table).select('campo')
  reply.send(all)
}

export default handler
