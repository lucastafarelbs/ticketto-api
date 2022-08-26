import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {config: {requiresAuth: true}}, handlers.getAll),
  fastify.post('/', {config: {requiresAuth: true}}, handlers.create),
  fastify.get('/type', {config: {requiresAuth: true}}, handlers.getAllEventType)
  fastify.post('/:eventId/duration', {config: {requiresAuth: true}}, handlers.createEventDuration)
  fastify.get('/:eventId/duration', {config: {requiresAuth: true}}, handlers.getAllEventDuration)
  fastify.post('/:eventId/information', {config: {requiresAuth: true}}, handlers.createEventInformation)
  fastify.get('/:eventId/information', {config: {requiresAuth: true}}, handlers.getEventInformation)
}

export default routes
