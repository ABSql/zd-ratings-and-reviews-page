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

const getReviewsListTest = async (id, count, page, sort) => {
  try {
    const list = await reviews.getReviewsListTest(id)
    // filter reported reviews
    let reviewList = list.reviews.filter(review => review.report === false)

    if (sort === 'helpful') {
      reviewList = reviewList.sort((a, b) => {
        return b.helpfulness - a.helpfulness
      })
    }
    // starting place for slice is determined by page size and count
    // ex page = 1 and count = 2 should return the second total review
    const startIndex = (page - 1) * count
    const endIndex = (startIndex + count)
    reviewList = reviewList.slice(startIndex, endIndex)
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

const getReviewsMetaTest = async (prodId) => {
  try{
    // get reviews meta data
    let meta = await reviews.getAllMetaTest(prodId)

    const ratingMeta = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }
    const recommendMeta = {
      0: 0,
      1: 0,
    }
    let charMeta = {}
    // need to get char names and match them with id's since the reviews dont have char
    // names attached
    const charPlaceholder = {}
    meta.characteristics.forEach((char) => {
      charPlaceholder[char._id] = {name: char.name, total: 0, count: 0}
    })
    meta.reviews.forEach((review) => {
      let rating = review.rating
      let recommend = review.recommend
      ratingMeta[rating] += 1
      recommendMeta[recommend] += 1
      if (review.characteristics[0]) {
        review.characteristics.forEach((char) => {
          let id = char._id
          charPlaceholder[id].total += char.value
          charPlaceholder[id].count += 1
        })
      }
    })

    for (id in charPlaceholder) {
      charMeta[charPlaceholder[id].name] = {
        id: id,
        value: charPlaceholder[id].total / charPlaceholder[id].count,
      }
    }

    const output = {
      product_id: prodId,
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
  getReviewsMetaTest,
  getReviewsListTest,
}

