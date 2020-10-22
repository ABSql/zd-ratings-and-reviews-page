import axios from 'axios';

const markReviewAsHelpful = (reviewId) => {
  console.log(reviewId)
axios.put(`http://localhost:9003/reviews/helpful/${reviewId}`)
  .then((res) => (res.data))
  .catch((err) => { throw err; });}

export default markReviewAsHelpful;
