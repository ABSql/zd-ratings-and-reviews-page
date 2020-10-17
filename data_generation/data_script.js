const faker = require('faker')
const fs = require('fs')
const fakerFuncs = require('./faker_funcs.js')

const writeReviews = fs.createWriteStream('./data_generation/10M_Reviews.csv');

const generateXReviews = (writer, number, encoding, cb) => {
  let i = number
  let id = 1
  let charId = 1
  function write() {
    let ok = true;
    do {
      let numReviews = faker.random.number({'min': 0, 'max': 100})
      let prodChars = faker.random.number({'min': 1, 'max': 5})
      let charIds = []
      // create array of characteristic ids to pass to product/reviews
      for (let i = 0; i < prodChars; i++) {
        charIds.push(charId)
        charId += 1
      }
      let prodEntry = JSON.stringify(fakerFuncs.createProductEntry(id, numReviews, charIds)) + '\n'
      i -= numReviews
      id += 1
      if (i <= 0) {
        writer.write(prodEntry, encoding, cb);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(prodEntry, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

generateXReviews(writeReviews, 10000000, 'utf-8', () => {
  writeReviews.end()
})