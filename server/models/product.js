const product = require('../database/schema.js')

const createProduct = async (chars) => {

  const newProd = new product.Product({
    _id: await product.getNextSequenceValue('productid'),
    reviews: [],
    characteristics: []
  })

  if (chars) {chars.forEach((char) => {
    newProd.characteristics.push({_id: char.uuid, name: char.name})
  })}

  return newProd.save((err, prod) => {
    if (err) throw err
    return prod
  })
}

module.exports = {
  createProduct
}