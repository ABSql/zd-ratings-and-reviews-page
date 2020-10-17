const faker = require('faker')
const fs = require('fs')

const createProduct = (id) => {
  const inputArray = []
  for (let i = 0; i < faker.random.number({'min': 1, 'max': 5}); i++) {
    let char = {
      _id: faker.random.uuid(),
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

const createReview = () => {
  const rating = faker.random.number({'min': 1, 'max': 5})
  const summary = faker.lorem.sentence()
  const body = faker.lorem.sentences(2, '. ')
  const recommend = faker.random.number(1)
  const name = faker.name.firstName()
  const email = faker.internet.email()
  const photos = []
  for (let i = 0; i < faker.random.number(3); i++){
    photos.push(faker.internet.domainName())
  }
  const helpfulness = 0
  const report = false

  const output = {
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    helpfulness,
    report,
  }
  return output
}

const createCharEntry = (prodId, char) => {
  const characteristic = {
    prod_id: prodId,
    char_id: char._id,
    value: faker.random.number({'min': 1, 'max': 5}),
  }
  return characteristic
}

// create product and populate with random num of reviews
const createProductEntry = (id, numReviews) => {
  const newProduct = createProduct(id)
  for (let i = 0; i < numReviews; i++) {
    newProduct.reviews.push(createReview())
  }
  return newProduct
}

module.exports = {
  createProductEntry,
  createCharEntry,
  createReview,
  createProduct
}

// const writeReviews = fs.createWriteStream('./data_generation/reviews.csv');
// writeReviews.write('fake reviews\n', 'utf8');

// const writeChars = fs.createWriteStream('./data_generation/chars.csv');
// writeChars.write('fake chars\n', 'utf8');

// const generateReviews = (writer1, writer2, number, encoding, cb) => {
//   let i = number
//   let id = 0
//   function write() {
//     let ok = true;
//     do {
//       let numReviews = faker.random.number({'min': 0, 'max': 100})
//       let prodEntry = createProductEntry(id, numReviews)
//       let prodChars = prodEntry.characteristics
//       i -= numReviews;
//       id += 1;
//       if (i === 0) {
//         writer1.write(prodEntry, encoding, callback);
//         writer2.write(prodEntry, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer1.write(prodEntry, encoding);
//         ok = writer2.write(prodEntry, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer1.once('drain', write);
//       writer2.once('drain', write);
//     }
//   }
// write()
// }

// generateReviews(writeReviews, writeChars, 1000, 'utf-8', () => {
//   writeReviews.end()
// })

