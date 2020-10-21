const faker = require('faker')
const ids = require('mongoose')

const createReview = (context, events, done) => {
  const _id = {$oid: ids.Types.ObjectId()}
  const rating = faker.random.number({'min': 1, 'max': 5})
  const summary = faker.lorem.sentence()
  const body = faker.lorem.sentences(2, '. ')
  const recommend = faker.random.number(1)
  const name = faker.name.firstName()
  const email = faker.internet.email()
  const photos = []
  for (let i = 0; i < faker.random.number(3); i++){
    let photoEntry = {
      _id: {$oid: ids.Types.ObjectId()},
      url: faker.image.imageUrl()
    }
    photos.push(photoEntry)
  }
  const characteristics = []
  const helpfulness = 0
  const report = false
// add variables to context for artillery to access
    context.vars._id = _id
    context.vars.rating = rating
    context.vars.summary = summary
    context.vars.body = body
    context.vars.recommend = recommend
    context.vars.name = name
    context.vars.email = email
    context.vars.photos = photos

  return done()
}

module.exports = {
  createReview,
}