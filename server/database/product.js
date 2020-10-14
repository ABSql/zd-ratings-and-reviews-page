import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  _id: Schema.Types.Objectid,
  reviews: [{ type: Schema.Types.Objectid, ref: 'Review' }],
  characteristics: [{ type: Schema.Types.Objectid, ref: 'Characteristic' }],
})

const Product = mongoose.model('Product', productSchema)

const createNewProduct = () => {
  const prod = new Product()
}



