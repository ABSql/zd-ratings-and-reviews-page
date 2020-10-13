import axios from 'axios';

const addReview = (id, params) => axios.post(`http://localhost:9003/reviews/${id}`, {
  rating: params.rating,
  summary: params.title,
  body: params.review,
  recommend: params.recommendation,
  name: params.username,
  email: params.email,
  photos: [],
  characteristics: {},
})
  .then((res) => (res.data))
  .catch((err) => { throw err; });

export default addReview;
