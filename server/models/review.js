const product = require('../database/schema.js')

const createReview = async (productId, data) => {

  const reviewData = new product.Review({
    // _id: await product.getNextSequenceValue("review_id"),
    rating: data.rating,
    summary: data.summary,
    body: data.body,
    recommend: data.recommend,
    name: data.name,
    email: data.email,
    photos: [],
    characteristics: data.characteristics,
    helpfulness: 0,
    report: false,
  })

  if (data.photos) {data.photos.forEach((url) => {
    reviewData.photos.push({url: url})
  })}

  return product.Product.findOneAndUpdate({_id: productId}, {$push: {reviews: reviewData}})
}

const markHelpful = (id) => {
  // find product containing review with input id
  return product.Product.findOne({'reviews._id': id}, (err, prod) => {
    // select review with input id and increment helpfullness by 1
    prod.reviews.id(id).helpfulness += 1
    prod.save((err) => {
      if (err) throw err
    })
  })

}

const reportReview = (id) => {
  return product.Product.findOne({'reviews._id': id}, (err, prod) => {
    // select review with input id and increment helpfullness by 1
    prod.reviews.id(id).report = true
    prod.save((err) => {
      if (err) throw err
    })
  })
}

const getReviewsList = (id, count, page, sort) => {
  return product.Product.findOne({_id: id})
    // .exec((err, prod) => {
    //   if (err) throw err
    //   // starting place for slice is determined by page size and count
    //   //ex page = 1 and count = 2 should return the second total review
    //   const startIndex = (page - 1) * count
    //   const endIndex = startIndex + count
    //   const reviewList = prod.reviews.slice(startIndex, endIndex)
    //   return reviewList
    // })
}

module.exports = {
  createReview,
  markHelpful,
  reportReview,
  getReviewsList,
}