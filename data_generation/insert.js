const fakerFunc = require('./faker_funcs.js')
const faker = require('faker')
const MongoClient = require("mongodb").MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'sdc'

MongoClient.connect(url, async (err, client) => {
  if (err) throw err
  console.time('total time')

  const db = client.db(dbName)
  const prodCollection = db.collection("products")
  let id = 1
  let charId = 1
  for (let k = 0; k < 1; k++){
    let products = []
  // create i number of reviews
  console.time('data generation time')
    for (let i = 0; i < 1000000; i++) {
      let numReviews = faker.random.number({'min': 0, 'max': 50})
      let numChars = faker.random.number({'min': 0, 'max': 5})
      let charArray = []
      //generate array of characteristic id's
      for (let i = 0; i < numChars; i++) {
        charArray.push(charId)
        charId += 1
      }
      let prodEntry = fakerFunc.createProductEntry(id, numReviews, charArray)
      products.push(prodEntry)
      // subtract 1 b/c loop is adding 1
      i += (numReviews - 1)
      id += 1
    } try{
      console.timeEnd('data generation time')
      console.time('data insert time')
      await prodCollection.insertMany(products)
      console.timeEnd('data insert time')
      console.log('seeded ', k, ' times')
    } catch (e) {
      console.log(e)
    }
}
console.log('Database seeded!')
console.timeEnd('total time')
client.close()
})