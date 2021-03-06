const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const sequenceSchema = new Schema({
  _id: String,
  sequence_value: Number,
})

const Sequence = mongoose.model('Sequence', sequenceSchema)

// used to access sequence documents for each id, so it can start 1 and count up
const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Sequence.findOneAndUpdate({_id: sequenceName },{$inc:{sequence_value:1}});
  return sequenceDocument.sequence_value;
}

const photoSchema = new Schema({
  url: String,
})

const Photo = mongoose.model('Photo', photoSchema)

const charvalueSchema = new Schema({
  _id: Number,
  value: Number,
})

const Charvalue = mongoose.model('Charvalue', charvalueSchema)

const reviewSchema = new Schema({
  rating: Number,
  summary: String,
  body: String,
  recommend: Number,
  name: String,
  email: String,
  photos: [photoSchema],
  characteristics: [],
  helpfulness: Number,
  report: Boolean,
})

const Review = mongoose.model('Review', reviewSchema)

const characteristicSchema = new Schema({
  _id: Number,
  name: String,
})

const Characteristic = mongoose.model('Characteristic', characteristicSchema)



const productSchema = new Schema({
  _id: Number,
  reviews: [reviewSchema],
  characteristics: [characteristicSchema],
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
  Product,
  productSchema,
  Review,
  Photo,
  Characteristic,
  Charvalue,
  getNextSequenceValue
}
