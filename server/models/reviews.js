import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = newSchema({
  _id: Schema.Types.Objectid,
  rating: Number,
  summary: String,
  body: String,
  recommended: Boolean,
  username: String,
  email: String,
  photos: [{ type: Schema.Types.Objectid, ref: 'Photo' }],
  helpfulness: Number,
  report: Boolean,
})

const Review = mongoose.model('Review', reviewSchema)
