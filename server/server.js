const fastify = require('fastify')({
  logger: true
})
const path = require('path')
// const controllers = require('controllers')

fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../client/dist')
})

fastify.get('/reviews/:product_id/list', async (request, reply) => {
  const reviewList = controllers.getReviewsList(request.params.product_id)
  reply.send(reviewList)
})

fastify.get('/reviews/:product_id/meta', (request, reply) => {

})

fastify.get('/reviews/:product_id', (request, reply) => {

})

fastify.post('/reviews/:product_id', (request, reply) => {

})

fastify.put('/reviews/helpful/:review_id', (request, reply) => {

})

fastify.put('/reviews/report/:review_id', (request, reply) => {

})

fastify.delete('/reviews/:review_id', (request, reply) => {

})

// Run the server!
fastify.listen(9003, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Hello Scrumdog. Your server listening on ${address}`)
})