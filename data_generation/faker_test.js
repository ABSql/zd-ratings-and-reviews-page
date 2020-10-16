const faker = require('faker')

// for(let i=0; i<8; i++){

// // Fake first name
//   const feature1 = faker.commerce.productAdjective()

// // Fake last name
//   const feature2 = faker.commerce.productAdjective()

// // Fake suffix
//   const feature3 = faker.commerce.productAdjective()

// // Fake job Title
//   const feature4 = faker.commerce.productAdjective()

//   console.log(`${feature1} ${feature2} ${feature3} ${feature4}`)
// }

// for(let i=0; i<8; i++){
//   const rating = faker.random.number({'min': 1, 'max': 5})
//   const summary = faker.lorem.sentence()
//   const body = faker.lorem.sentences(2, '. ')
//   const recommend = faker.random.number(1)
//   const name = faker.name.firstName()
//   const email = faker.internet.email()
//   const photo = faker.internet.domainName()
//   const uuid = faker.random.uuid()

//   console.log(rating, summary, body, recommend, name, email, photo, typeof uuid)
//   }

  const createProduct = (numChars) => {
    const inputArray = []
    for (let i = 0; i < numChars; i++) {
      let char = {
        uuid: faker.random.uuid(),
        name: faker.commerce.productAdjective()
      }
      inputArray.push(char)
    }
    return inputArray
  }

  const createReview = (charIds) => {
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
    const characteristics = {}
    charIds.forEach((value) => {
      characteristics[value.uuid] = faker.random.number({'min': 1, 'max': 5})
    })
    const output = {
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    }
    return output
  }

  const x = createProduct(4)
  const y = createReview(x)
  console.log('prod:',x)
  console.log('rev:', y)