import mongoose from 'mongoose';
const { Schema } = mongoose;

const characteristicSchema = newSchema({
  _id: Schema.Types.Objectid,
  name: String,
  values: [Number]
})
