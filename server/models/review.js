const product = require('../database/schema.js')

const createReview = async (productId, data) => {
  const photosWithID = []
  for (let i = 0; i < data.photos.length; i++) {
    let currentPhoto = {
      _id: await product.getNextSequenceValue("photo_id"),
      url: data.photos[i]
    }
    photosWithID.push(currentPhoto)
  }
  console.log(data)
  const reviewData = {
    _id: await product.getNextSequenceValue("review_id"),
    rating: data.rating,
    summary: data.summary,
    body: data.body,
    recommend: data.recommend,
    name: data.name,
    email: data.email,
    photos: photosWithID,
    characteristics: data.characteristics,
    helpfulness: 0,
    report: false,
  }

  return product.Product.findOneAndUpdate({_id: productId}, {$push: {reviews: reviewData}})
}

module.exports = {
  createReview
}