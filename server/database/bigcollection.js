const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

const sequenceSchema = new Schema({
  _id: String,
  sequence_value: Number,
})

const Sequence = mongoose.model('Sequence', sequenceSchema)

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Sequence.findOneAndUpdate({_id: sequenceName },{$inc:{sequence_value:1}});
  return sequenceDocument.sequence_value;
}

const productSchema = new Schema({
  _id: Number,
  reviews: [
    {
      _id: Number,
      rating: Number,
      summary: String,
      body: String,
      recommend: Number,
      name: String,
      email: String,
      photos: [
        {
          _id: Number,
          url: String,
        }
      ],
      helpfulness: Number,
      report: Boolean,
    }
  ],
  characteristics: [
    {
      _id: Number,
      name: String,
      values: [Number],
    }
  ],
})

const Product = mongoose.model('Product', productSchema)

const createProduct = async (chars) => {
  console.log(chars)
  const newProd = new Product({
    _id: await getNextSequenceValue('productid'),
    reviews: [],
    characteristics: []
  })
  newProd.save((err) => {
    if (err) throw err
    if (chars) {chars.forEach(async (name) => {
      await newProd.update({$push: { characteristics: { _id: await getNextSequenceValue("characteristic_id"), name: name, values: [] } }})
    })}
  })
}

module.exports = {
  createProduct
}
