const product = require('../database/schema.js')

const createProduct = async (chars) => {
  console.log(chars)

  const newProd = new product.Product({
    _id: await product.getNextSequenceValue('productid'),
    reviews: [],
    characteristics: []
  })

  newProd.save((err) => {
    if (err) throw err
    if (chars) {chars.forEach(async (name) => {
      await newProd.update({$push: { characteristics: { _id: await product.getNextSequenceValue("characteristic_id"), name: name} }})
    })}
  })
}

module.exports = {
  createProduct
}