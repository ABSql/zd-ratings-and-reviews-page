const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characteristicSchema = new Schema({
  name: String,
  values: [Number]
})

const Characteristic = mongoose.model('Characteristic', characteristicSchema)

const createCharacteristic = (name, prod) => {
  console.log('in func')
  const char = new Characteristic({
    name: name,
    product: prod._id,
    values: [],
  })

  char.save((err) => {
    if (err) {
      console.log(err)
      return err}
    // Product.findOne({_id: prod._id})
      prod.update({$push: {characteristics: char._id}})
      .populate('characteristics')
      .exec((err, characteristics) => {
        if (err) return err
        console.log('Populated characteristics, ', characteristics)
      })
  })
}

module.exports = {
  createCharacteristic,
}