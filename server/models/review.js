const product = require('../database/schema.js')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient

mongoose.connect("mongodb://localhost:27017/sdc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
})

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

  return product.Product.updateOne({_id: productId}, {$push: {reviews: reviewData}})
}

const markHelpful = (id) => {
  // find product containing review with input id
  const reviewId = mongoose.Types.ObjectId(id)
  return product.Product.updateOne({'reviews._id': reviewId}, {$inc:{'reviews.$[outer].helpfulness': 1}}, {'arrayFilters': [{'outer._id': reviewId}]})
}

const reportReview = (id) => {
  // find product containing review with input id
  const reviewId = mongoose.Types.ObjectId(id)
  return product.Product.updateOne({'reviews._id': reviewId}, {$set:{'reviews.$[outer].report': true}}, {'arrayFilters': [{'outer._id': reviewId}]})
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
        },
      }
    },
  ])
}

const getReviewsListTest = (id) => {
  return product.Product.findOne({_id: id}).lean()
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

const getAllMetaTest = (id) => {
  return product.Product.findOne({_id: id}).lean()
}

const getAllMeta = (id) => {
  return product.Product.aggregate([
    {$match: {_id: parseInt(id)}},
    {$unwind: '$reviews'},
    {$facet: {
      reviews: [
        {$group:
          {
            _id: '$reviews.rating',
            count: {$sum: 1}
          }
      }
      ],
      recommend: [
        {$group:
            {
              _id: '$reviews.recommend',
              count: {$sum: 1}
            }
          }
      ],
      characteristics: [
        {$unwind: '$reviews.characteristics'},
        {$group:
            {
              _id: '$reviews.characteristics._id',
              average: {$avg: '$reviews.characteristics.value'}
            }
          }
      ],
    }}
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
  getAllMeta,
  getAllMetaTest,
  getReviewsListTest,
}



