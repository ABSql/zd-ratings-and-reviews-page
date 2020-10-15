const product = require('../database/schema.js')

const createProduct = async (chars) => {
  console.log(chars)

  const newProd = new product.Product({
    _id: await product.getNextSequenceValue('productid'),
    reviews: [],
    characteristics: []
  })

  if (chars) {chars.forEach((name) => {
    newProd.characteristics.push({name: name})
  })}

  newProd.save((err) => {
    if (err) throw err
  })
}

module.exports = {
  createProduct
}