const reviews = require('../models/review.js')

const getReviewsList = () => {

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

