const express = require('express');
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews.js')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
  // const a = require('./models/product')
  // a.createProduct(["Fit", "Length", "Quality"])
});


const app = express();
const PORT = 9003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../client/dist'));

// Requests here
app.get('/reviews/:product_id/list', async (req, res) => {
  const count = req.query.count ? req.query.count : 5
  const page = req.query.page ? req.query.page : 1
  const sort = req.query.sort ? req.query.sort : 'newest'
  try {
    const reviewList = await reviews.getReviewsList(req.params.product_id, count, page, sort)
    res.status(201).send(reviewList)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/reviews/:product_id/meta', (req, res) => {
  const metaData = controllers.getReviewsMeta(req.params.product_id)
  res.send(metaData)
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
  try {
    console.log( await reviews.markHelpful(reviewId) )
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.put('/reviews/report/:review_id', async (req, res) => {
  const reportedReview = req.params.review_id
  try {
    console.log( await reviews.reportReview(reportedReview) )
    res.sendStatus(201)
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
});
