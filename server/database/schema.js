const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

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
      characteristics: {},
      helpfulness: Number,
      report: Boolean,
    }
  ],
  characteristics: [
    {
      _id: Number,
      name: String,
    }
  ],
})

const Product = mongoose.model('Product', productSchema)

module.exports = {
  Product,
  getNextSequenceValue
}
