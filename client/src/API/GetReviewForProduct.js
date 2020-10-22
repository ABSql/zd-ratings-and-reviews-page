import axios from 'axios';

const getReviewForProduct = (id) => axios(`http://localhost:9003/reviews/${id}/list?count=20`)
  .then((res) => (res.data))
  .catch((err) => { throw err; });

export default getReviewForProduct;
