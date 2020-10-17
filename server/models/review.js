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
    helpfulness: 0,
    report: false,
  })

  if (data.photos) {data.photos.forEach((url) => {
    reviewData.photos.push({url: url})
  })}

  return product.Product.findOneAndUpdate({_id: productId}, {$push: {reviews: reviewData}}).exec((err, prod) => {
    for (key in data.characteristics) {
      let char = new product.Charvalue({
        prod_id: productId,
        char_id: key,
        value: data.characteristics[key]
      })

      char.save()
    }
  })
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
    // select review with input id and change report from false to true
    prod.reviews.id(id).report = true
    prod.save((err) => {
      if (err) throw err
    })
  })
}

const getReviewsList = async (id, count, page, sort) => {
  return product.Product.aggregate([
    {$match: {_id: parseInt(id)}},
    {$project: {
      reviews: {$filter:
          {
            input: '$reviews',
            as: 'review',
            cond: { $eq: ['$$review.report', false]}
          }
        }
      }
    },
  ])
}

const getReviewsMeta = (id) => {
  return product.Product.aggregate([
    {$match: {_id: parseInt(id)}},
    {$unwind: '$reviews'},
    {$group:
        {
          _id: '$reviews.rating',
          count: {$sum: 1}
        }
      },
  ])
}

const getRecommendMeta = (id) => {
  return product.Product.aggregate([
    {$match: {_id: parseInt(id)}},
    {$unwind: '$reviews'},
    {$group:
        {
          _id: '$reviews.recommend',
          count: {$sum: 1}
        }
      },
  ])
}

const getCharMeta = (id) => {
  return product.Product.aggregate([
    {$match: {_id: parseInt(id)}},
    {$unwind: '$reviews'},
    {$unwind: '$reviews.characteristics'},
    {$group:
        {
          _id: '$reviews.characteristics._id',
          average: {$avg: '$reviews.characteristics.value'}
        }
      },
  ])
}

const getProduct = (id) => {
  return product.Product.findOne({_id: id})
}

module.exports = {
  createReview,
  markHelpful,
  reportReview,
  getReviewsList,
  getReviewsMeta,
  getRecommendMeta,
  getCharMeta,
  getProduct,
}