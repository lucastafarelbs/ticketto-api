import handlers from './handlers/index.js'

async function routes(fastify) {
  fastify.get('/', {
    config: {requiresAuth: true, context: 'event', functionality: 'getAll'}
  }, handlers.getAll),

  fastify.post('/', {
    config: {requiresAuth: true, context: 'event', functionality: 'create'}
  }, handlers.create),

  fastify.get('/type', {
    config: {requiresAuth: true, context: 'event', functionality: 'getAllType'}
  }, handlers.getAllEventType),

  fastify.post('/:eventId/duration', {
    config: {requiresAuth: true, context: 'event', functionality: 'createDuration'}
  }, handlers.createEventDuration),

  fastify.get('/:eventId/duration', {
    config: {requiresAuth: true, context: 'event', functionality: 'getAllDuration'}
  }, handlers.getAllEventDuration),

  fastify.get('/:eventId/information', {
    config: {requiresAuth: true, context: 'event', functionality: 'getInformation'}
  }, handlers.getEventInformation),

  fastify.post('/:eventId/information', {
    config: {requiresAuth: true, context: 'event', functionality: 'createInformation'}
  }, handlers.createEventInformation),

  fastify.get('/:eventId/ticket', {
    config: {requiresAuth: true, context: 'event', functionality: 'getTicket'}
  }, handlers.getEventTicket),

  fastify.post('/:eventId/ticket/:ticketId', {
    config: {requiresAuth: true, context: 'event', functionality: 'purchaseTicket'}
  }, handlers.purchaseTicket)
}

export default routes
