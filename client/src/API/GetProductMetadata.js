import axios from 'axios';

const getReviewMetadata = (id) => axios(`http://localhost:9003/reviews/${id}/meta`)
  .then((res) => (res.data))
  .catch((err) => { throw err; });

export default getReviewMetadata;
