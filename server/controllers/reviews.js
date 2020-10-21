const reviews = require('../models/review.js')

const getReviewsList = async (id, count, page, sort) => {
  try {
    const list = await reviews.getReviewsList(id, count, page, sort)
    // starting place for slice is determined by page size and count
    // ex page = 1 and count = 2 should return the second total review
    let returnReviews = list[0].reviews
    // sort by most helpful first
    if (sort === 'helpful') {
      returnReviews = list[0].reviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness
      })
    }
    const startIndex = (page - 1) * count
    const endIndex = (startIndex + count)
    const reviewList = returnReviews.slice(startIndex, endIndex)
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
  try{
    // get reviews meta data
    let meta = await reviews.getAllMeta(id)
    const ratingInfo = meta[0].reviews
    ratingMeta ={}
    ratingInfo.forEach((value) => {
      ratingMeta[value._id] = value.count
    })

    const recommended = meta[0].recommend
    recommendMeta ={}
    recommended.forEach((value) => {
      recommendMeta[value._id] = value.count
    })

    const charavg = meta[0].characteristics
    const prodInfo = await reviews.getProduct(id)
    const productChars= {}
    // create obj of the characteristic names and _id's
    // char names are only stored in the parent product chars array
    prodInfo.characteristics.forEach((value) => {
      productChars[value._id] = {
        name: value.name
      }
    })
    // format characteristics meta data
    // charavg _id corresponds to a key in the productChars array
    const charMeta = {}
    charavg.forEach((value) => {
      // aggregate query returns null for empty characteristic arrays
      if (value._id !== null) {
        charMeta[productChars[value._id].name] = {
          id: value._id,
          value: value.average
        }
      }
    })

    const output = {
      product_id: id,
      ratings: ratingMeta,
      recommended: recommendMeta,
      characteristics: charMeta,
    }
    return output
  } catch (err) {
    throw err
  }
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

