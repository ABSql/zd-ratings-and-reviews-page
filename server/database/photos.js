const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  url: String,
})

const Photo = mongoose.model('Photo', photoSchema)

const createPhoto = (url, review) => {
  const newPhoto = new Photo({
    url: url
  })

  newPhoto.save((err) => {
    if (err) throw err
    // push photo to array in reviews and link with populate
    review.update({$push: {photos: newPhoto._id}})
      .populate('photos')
      .exec((err, photos) => {
        if (err) return err
        console.log('Populated characteristics, ', photos)
      })
  })
}

module.exports = {
  createPhoto,
}