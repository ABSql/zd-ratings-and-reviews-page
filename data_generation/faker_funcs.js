const faker = require('faker')
const ids = require('mongoose')
const fs = require('fs')

const createProduct = (id, charIds) => {
  const inputArray = []
  for (let i = 0; i < charIds.length; i++) {
    let char = {
      _id: charIds[i],
      name: faker.commerce.productAdjective()
    }
    inputArray.push(char)
  }
  const prod = {
    _id: id,
    reviews: [],
    characteristics: inputArray
  }
  return prod
}

const createReview = (charIds) => {
  const _id = ids.Types.ObjectId()
  const rating = faker.random.number({'min': 1, 'max': 5})
  const summary = faker.lorem.sentence()
  const body = faker.lorem.sentences(2, '. ')
  const recommend = faker.random.number(1)
  const name = faker.name.firstName()
  const email = faker.internet.email()
  const photos = []
  for (let i = 0; i < faker.random.number(3); i++){
    let photoEntry = {
      // _id: ids.Types.ObjectId(),
      url: faker.image.imageUrl()
    }
    photos.push(photoEntry)
  }
  const characteristics = []
  for (let i = 0; i < charIds.length; i++) {
    let char = {
      _id: charIds[i],
      value: faker.random.number({'min': 1, 'max': 5})
    }
    characteristics.push(char)
  }
  const helpfulness = 0
  const report = false

  const output = {
    // _id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
    helpfulness,
    report,
  }
  return output
}

// create product and populate with random num of reviews
const createProductEntry = (id, numReviews, charIds) => {
  const newProduct = createProduct(id, charIds)
  for (let i = 0; i < numReviews; i++) {
    newProduct.reviews.push(createReview(charIds))
  }
  return newProduct
}

module.exports = {
  createProductEntry,
  createReview,
  createProduct
}

