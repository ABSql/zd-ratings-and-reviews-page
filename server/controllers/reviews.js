const reviews = require('../models/review.js')

const getReviewsList = async (id, count, page, sort) => {
  try {
    const list = await reviews.getReviewsList(id, count, page, sort)
    // starting place for slice is determined by page size and count
    // ex page = 1 and count = 2 should return the second total review
    const startIndex = (page - 1) * count
    const endIndex = startIndex + count
    const reviewList = list.slice(startIndex, endIndex)
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

const getReviewsMeta = async (id) => {
  const prodInfo = await reviews.getProduct(id)
  const chars = {}
  // create obj of the characteristic names and _id's
  // char names are only store in the parent product
  prodInfo.characteristics.forEach((value) => {
    chars[value._id] = {
      name: value.name
    }
  })
  // get review meta data and format
  const review = await reviews.getReviewsMeta(id)
  const ratings = {}
  review.forEach((value) => {
    ratings[value._id] = value.count
  })
  // get recommended meta data and format
  const recommend = await reviews.getRecommendMeta(id)
  const recommendOutput = {}
  recommend.forEach((value) => {
    recommendOutput[value._id] = value.count
  })
  const charValues = await reviews.getCharMeta(id)
  const charMeta = {}
  charValues.forEach((value) => {
    charMeta[chars[value._id].name] = {
      id: value._id,
      value: value.average
    }
  })
  const output = {
    product_id: id,
    ratings: ratings,
    recommended: recommendOutput,
    characteristics: charMeta,
  }

  return output
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

