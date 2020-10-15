const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
  const a = require('./database/bigcollection.js')
  a.createProduct(['Fit', 'Length'])
});


const app = express();
const PORT = 9003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../client/dist'));

// Requests here
app.get('/reviews/:product_id/list', (req, res) => {
  const reviewList = controllers.getReviewsList(req.params.product_id)
  res.send(reviewList)
})

app.get('/reviews/:product_id/meta', (req, res) => {
  const metaData = controllers.getReviewsMeta(req.params.product_id)
  res.send(metaData)
})

app.post('/reviews/:product_id', (req, res) => {
  const review = req.body
  controllers.addReview(review)
})

app.put('/reviews/helpful/:review_id', (req, res) => {
  const helpfulReview = req.body
  controllers.markHelpful(helpfulReview)
})

app.put('/reviews/report/:review_id', (req, res) => {
  const reportedReview = req.body
  controller.reportReview(reportedReview)
})

app.delete('/reviews/:review_id', (req, res) => {
  const removedReview = req.body
  controller.removeReview(removedReview)
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello, Scrumdog.  Your server is running on PORT: ${PORT}`);
});
