import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {
    config: {requiresAuth: true, context: 'entity', functionality: 'getAll'}
  }, handlers.getAll),
  fastify.post('/', {
    config: {requiresAuth: true, context: 'entity', functionality: 'create'}
  }, handlers.create)
}

export default routes
