const fakerFunc = require('./faker_funcs.js')
const faker = require('faker')
const MongoClient = require("mongodb").MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'sdc'

MongoClient.connect(url, async (err, client) => {
  if (err) throw err
  console.time('insert time')

  const db = client.db(dbName)
  const prodCollection = db.collection("products")
  const charCollection = db.collection("charvalues")
  let id = 1
  for (let k = 0; k < 1; k++){
    let products = []
    let chars = []
  // create i number of reviews
    for (let i = 0; i < 1000000; i++) {
      let numReviews = faker.random.number({'min': 0, 'max': 50})
      let prodEntry = fakerFunc.createProductEntry(id, numReviews)
      products.push(prodEntry)
      // for each product create numReviews character documents for each
      // product characteristic
      for (let j = 0; j < prodEntry.characteristics.length; j++) {
        let currentChar = prodEntry.characteristics[j]
        for (let k = 0; k < numReviews; k++) {
          let charEntry = fakerFunc.createCharEntry(id, currentChar)
          chars.push(charEntry)
        }
      }
      // subtract 1 b/c loop is adding 1
      i += (numReviews - 1)
      id += 1
    } try{
      await prodCollection.insertMany(products)
      await charCollection.insertMany(chars)
      console.log('seeded ', k, ' times')
    } catch (e) {
      console.log(e)
    }
}
console.log('Database seeded!')
console.timeEnd('insert time')
client.close()
})