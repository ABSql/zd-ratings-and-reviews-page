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

// db.products.explain('executionStats').aggregate([
//   {$match: {_id: 19000}},
//   {$project: {
//     reviews: {$filter:
//         {
//           input: '$reviews',
//           as: 'review',
//           cond: { $eq: ['$$review.report', false]}
//         }
//       }
//     }
//   },
// ])

// db.products.explain('executionStats').aggregate([
//     {$match: {_id: {$gt: 100000, $lt: 100010}}},
//     {$unwind: '$reviews'},
//     {$facet: {
//       reviews: [
//         {$group:
//           {
//             _id: '$reviews.rating',
//             count: {$sum: 1}
//           }
//       }
//       ],
//       recommend: [
//         {$group:
//             {
//               _id: '$reviews.recommend',
//               count: {$sum: 1}
//             }
//           }
//       ],
//       characteristics: [
//         {$unwind: '$reviews.characteristics'},
//         {$group:
//             {
//               _id: '$reviews.characteristics._id',
//               average: {$avg: '$reviews.characteristics.value'}
//             }
//           }
//       ],
//     }}
//   ])


// db.products.explain('executionStats').update({_id: 199800}, {$push: {'reviews': {"rating":1,"summary":"Voluptatem dolores dolor.","body":"Deleniti aut deleniti iste dolorum mollitia esse quibusdam quia sit.. Et quis accusamus nam ipsa numquam dolore omnis et vitae.","recommend":0,"name":"Ayana","email":"Mackenzie51@yahoo.com","photos":["ethyl.com"],"characteristics":[{"_id":1,"value":2},{"_id":2,"value":1}],"helpfulness":0,"report":false}}})

// db.products.update({_id: 199800}, {$push: {'reviews': {"rating":1,"summary":"Voluptatem dolores dolor.","body":"Deleniti aut deleniti iste dolorum mollitia esse quibusdam quia sit.. Et quis accusamus nam ipsa numquam dolore omnis et vitae.","recommend":0,"name":"Ayana","email":"Mackenzie51@yahoo.com","photos":["ethyl.com"],"characteristics":[{"_id":1,"value":2},{"_id":2,"value":1}],"helpfulness":0,"report":false}}})