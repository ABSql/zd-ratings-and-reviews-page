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
    const text = 'SELECT * FROM reviews WHERE id = $1 LIMIT $2 OFFSET $3'
    const args = [2, 1, 1]
    const client = await pool.connect()
    const res = await client.query(text, args)
    console.log(res.rows)
    client.release()
  } catch (err) {
    throw err
    client.release()
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
   client.release()
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
    client.release()
  }
}

exports.getMeta = () => {

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
    client.release()
  }
}

exports.postReview = () => {

}