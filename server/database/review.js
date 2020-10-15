const mongoose = require('mongoose');
const Schema = mongoose.Schema
const photos = require('./photos.js')

const reviewSchema = new Schema({
  rating: Number,
  summary: String,
  body: String,
  recommend: Number,
  name: String,
  email: String,
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  helpfulness: Number,
  report: Boolean,
})

const Review = mongoose.model('Review', reviewSchema)

const createReview = (data) => {
  const newReview = new Review({
  rating: data.rating,
  summary: data.summary,
  body: data.review,
  recommend: data.recommend,
  name: data.name,
  email: data.email,
  photos: [],
  helpfulness: 0,
  report: false,
  })

   newReview.save( async (err) => {
    if (err) throw err
    // wait for query to return then loop through and create chars for products
    const reviewQuery = await Review.findOne({_id: newReview._id})
    data.photos.forEach((value) => {
      photos.createPhoto(value, reviewQuery)
    })
  })
}


module.exports = {
  createReview,
}
