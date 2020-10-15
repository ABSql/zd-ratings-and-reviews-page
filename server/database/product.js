const mongoose = require('mongoose');
const Schema = mongoose.Schema
const char = require('./characteristic.js')

const productSchema = new Schema({
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  characteristics: [{ type: Schema.Types.ObjectId, ref: 'Characteristic' }],
})

const Product = mongoose.model('Product', productSchema)

const createNewProduct = (chars) => {
  const prod = new Product({
    reviews: [],
    characteristics: [],
  })

  prod.save( async (err) => {
    if (err) return err

    // wait for query to return then loop through and create chars for products
    const prodQuery = await Product.findOne({_id: prod._id})
    chars.forEach((value, index) => {
      char.createCharacteristic(value, prodQuery)
    })
  })

}

module.exports = {
  createNewProduct,
}

