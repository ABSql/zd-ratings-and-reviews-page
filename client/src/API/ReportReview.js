import axios from 'axios';

const addReview = (reviewId) => axios.put(`http://localhost:9003/reviews/report/${reviewId}`)
  .then((res) => (res.data))
  .catch((err) => { throw err; });

export default addReview;
