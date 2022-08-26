import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import dbConnector from './db-connector.js'
import 'dotenv/config'
import hooks from './fastify-hooks/index.js'
import registerRoutes from './register-routes.js'

const start = function () {
  try {
    if (!process.env.PORT) throw new Error('set the server configs')
    const dbConnection = dbConnector()
    if (!dbConnection) return

    // fastify
    const fastify = Fastify({logger: false})
    fastify.register(fastifyCors, {})
    fastify.decorate('dbConnection', dbConnection)
    fastify.addHook('onRequest', hooks.onRequest)
    fastify.get('/', (_, reply) => reply.send('Everything is fine :)'))
    registerRoutes(fastify, './modules')
    fastify.listen({ port: process.env.PORT, host: '0.0.0.0' })

    console.log(`Database is connected on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
    console.log(`Server is running at: ${process.env.PORT}!`)
  } catch (error) {
    console.log('res')
    console.log(error)
    process.exit(1)
  }
}

start()
