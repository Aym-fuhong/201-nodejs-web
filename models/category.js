import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: String,
  items: {type: [],ref: 'Item'}
});

module.exports = mongoose.model('Category', categorySchema);