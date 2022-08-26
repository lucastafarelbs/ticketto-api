import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {config: {requiresAuth: true}}, handlers.getAll),
  fastify.post('/', {config: {requiresAuth: false}}, handlers.create)
  fastify.post('/login', {config: {requiresAuth: false}}, handlers.login)
}

export default routes
