const reviews = require('../models/review.js')

const getReviewsList = async (id, count, page, sort) => {
  try {
    const list = await reviews.getReviewsList(id, count, page, sort)
    // starting place for slice is determined by page size and count
    // ex page = 1 and count = 2 should return the second total review
    const startIndex = (page - 1) * count
    const endIndex = startIndex + count
    const reviewList = list.reviews.slice(startIndex, endIndex)
    const output = {
      product: id,
      page: page,
      count: count,
      results: reviewList
    }
    return output
  } catch (err) {
    throw err
  }
}

const getReviewsMeta = () => {

}

const addReview = (id, data) => {
  return reviews.createReview(id, data)
}

const markHelpful = (id) => {
  return reviews.markHelpful(id)
}

const reportReview = (id) => {
  return reviews.reportReview(id)
}

const removeReview = () => {

}

module.exports = {
  getReviewsList,
  getReviewsMeta,
  addReview,
  markHelpful,
  reportReview,
  removeReview,
}

