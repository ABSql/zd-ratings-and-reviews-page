const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SDC',
  password: '2327',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Error:', err);
});
(async () => {
  try {
    const client = await pool.connect()
    const text = 'SELECT rating, COUNT (rating), recommend, COUNT (recommend) FROM reviews WHERE product_id = $1 GROUP BY rating, recommend'
    const res = await client.query(text, [6])
    console.log(res.rows)
    client.release()
  } catch (err) {
    console.log(err)
    throw err
  }
})();

exports.markHelpful = async (id) => {
 try {
   const text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1'
   const args = [id]
   const client = await pool.connect()
   const res = await client.query(text, args)
   client.release()
   return res
 } catch (err) {
   throw err
 }
}

exports.markReported = async (id) => {
  try {
    const text = 'UPDATE reviews SET report = true WHERE id = $1'
    const args = [id]
    const client = await pool.connect()
    const res = await client.query(text, args)
    client.release()
    return res
  } catch (err) {
    throw err
  }
}

exports.getMeta = async (id) => {
  try {
    const text = 'SELECT rating, COUNT (rating), recommend, COUNT (recommend) FROM reviews WHERE product_id = $1 GROUP BY rating, recommend'
    const client = await pool.connect()
    const res = await client.query(text, [id])
    client.release()
    return res
  } catch (err) {
    throw err
  }
}

exports.getList = async (id, count, offset, sort) => {
  try {
    const text = 'SELECT * FROM reviews WHERE id = $1 LIMIT $2 OFFSET $3'
    const args = [id, count, offset]
    const client = await pool.connect()
    const res = await client.query(text, args)
    client.release()
    return res
  } catch (err) {
    throw err
  }
}

exports.postReview = async (id, review, photosArray, charsObj) => {
  try {
    const review = 'INSERT INTO reviews (product_id, rating, summary, body, recommend, report, name, email, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id'
    const reviewArgs = [id, review.rating, review.summary, review.body, review.recommend, false, review.name, review.email, 0]
    const client = await pool.connect()
    let reviewId = await client.query(text, args)
    // gets id from newly created review
    reviewId = res.rows[0].id

    const photos = `INSERT INTO photos (review_id, url) VALUES ($1, $2)`
    photosArray.forEach( async (url) => {
      let params = [reivewId, url]
      await client.query(photos, params)
    })
    const characteristics = `INSERT INTO review_characteristics (review_id, char_id, value) VALUES ($1, $2, $3)`
    for (const [key, value] of Object.entries(object1)) {
      let params = [reviewId, key, value]
      await client.query(characteristics, params)
    }

    client.release()
    return res
  } catch (err) {
    throw err
  }
}