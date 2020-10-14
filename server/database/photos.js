
import mongoose from 'mongoose';
const { Schema } = mongoose;

const photoSchema = newSchema({
  _id: Schema.Types.Objectid,
  url: String,
})