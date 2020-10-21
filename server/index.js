const newrelic = require('newrelic');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews.js')

const app = express();
const PORT = 9003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression())
app.use(express.static('../client/dist'));

app.get('/hello', (req, res) => {
  res.status(200).send('hellowworld')
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

// Requests here
app.get('/reviews/:product_id/list', async (req, res) => {
  const count = req.query.count ? parseInt(req.query.count) : 5
  const page = req.query.page ? parseInt(req.query.page) : 1
  const sort = req.query.sort ? req.query.sort : 'newest'
  try {
    const reviewList = await reviews.getReviewsList(req.params.product_id, count, page, sort)
    res.status(200).send(reviewList)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/reviews/:product_id/meta', async (req, res) => {
  try {
    const meta = await reviews.getReviewsMeta(req.params.product_id)
    res.status(200).send(meta)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/reviews/:product_id', async (req, res) => {
  const reviewData = req.body
  try {
    await reviews.addReview(req.params.product_id, reviewData)
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.put('/reviews/helpful/:review_id', async (req, res) => {
  const reviewId = req.params.review_id
  if (req.params.review_id === 'undefined') {
    res.sendStatus(200)
  } else {
      try {
        await reviews.markHelpful(reviewId)
        res.sendStatus(200)
      } catch(err) {
        console.log(err)
        res.sendStatus(500)
      }
  }
})

app.put('/reviews/report/:review_id', async (req, res) => {
  const reportedReview = req.params.review_id
  try {
    if (reportedReview === 'undefined') {
      res.sendStatus(200)
      return
    }
    await reviews.reportReview(reportedReview)
    res.sendStatus(200)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.delete('/reviews/:review_id', (req, res) => {
  const removedReview = req.body
  controller.removeReview(removedReview)
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello, Scrumdog.  Your server is running on PORT: ${PORT}`);
  console.log('Node Env is: ', process.env.NODE_ENV)
});
