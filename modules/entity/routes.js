import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {config: {requiresAuth: true}}, handlers.getAll),
  fastify.post('/', {config: {requiresAuth: true}}, handlers.create)
}

export default routes
