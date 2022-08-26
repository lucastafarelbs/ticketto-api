import test from './handlers/test'

async function routes(fastify: any) {
  fastify.get('/teste', {config: {requiresAuth: true}}, test)
}

export default routes
