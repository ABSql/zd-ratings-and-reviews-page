const product = require('../database/schema.js')
var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
var url = "mongodb://localhost:27017/";

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

  return product.Product.update({_id: productId}, {$push: {reviews: reviewData}})
}

/**** if product hasnt beene edited it will have string as _id, if it has been edited
 * it will have objectid as _id, either handle that here or fix in data generation
 */
const markHelpful = async (id) => {
  const prod1 = await product.Product.aggregate([
    {$match: {'reviews._id': mongoose.Types.ObjectId(id)}},
    // {$unwind: '$reviews'},
    // {$match: {'reviews._id': id}},
    // {$set: {'reviews.helfulness': 1}}
  ])
  // have prod id can now replace at review id
  let newprod = prod1[0]
  for (let i = 0; i < newprod.reviews.length; i++) {
    let string1 = newprod.reviews[i]._id.toString()
    if (string1 === id) {
      newprod.reviews[i].helpfulness += 1
      break
    }
  }
  product.Product.findByIdAndUpdate(newprod._id, newprod, (err, prod) => {
    if (err) throw err
    // console.log(prod)
    prod.save()
  })
}

// const markHelpful = (id) => {
//   // find product containing review with input id

//   return product.Product.find({'reviews._id': `${id}`}, (err, prod) => {
//     // select review with input id and increment helpfullness by 1
//     console.log(prod)
//     prod.reviews.id(id).helpfulness += 1
//     prod.save((err) => {
//       if (err) throw err
//     })
//   })

// }

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
}