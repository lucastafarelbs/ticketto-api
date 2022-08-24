import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import dbConnector from './db-connector'
import 'dotenv/config'
// import registerRoutes from './register-routes'
import routesTeste from './modules/test/routes'
const start = async function () {
  try {
    const dbConnection = dbConnector()
    if (!dbConnection) return

    const fastify = Fastify({logger: false})
    fastify.register(fastifyCors, {})
    fastify.decorate('dbConnection', dbConnection)
    fastify.get('/', (_, reply) => reply.send('Everything is fine :)'))

    fastify.register(routesTeste)
    // registerRoutes(fastify, './modules')
    const port: any = process.env.PORT
    fastify.listen({port, host: '0.0.0.0'})

    console.log(`Database is connected on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
    console.log(`Server is running at localhost:${port}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
