import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {
    config: {requiresAuth: true, context: 'user', functionality: 'getAll'}
  }, handlers.getAll),

  fastify.post('/', {
    config: {requiresAuth: false, context: 'user', functionality: 'create'}
  }, handlers.create),
  fastify.post('/login', {config: {requiresAuth: false}}, handlers.login)
}

export default routes
