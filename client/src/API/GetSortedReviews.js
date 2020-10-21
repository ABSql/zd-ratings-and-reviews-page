import axios from 'axios';

const getSortedReviews = (filter, id) => axios(`http://localhost:9003/reviews/${id}/list?count=20&sort=${filter}`)
  .then((res) => (res.data))
  .catch((err) => { throw err; });

export default getSortedReviews;
