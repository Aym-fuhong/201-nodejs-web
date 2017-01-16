import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  price: Number,
  categoryId: {type: Number,ref: 'Category'}
});

module.exports = mongoose.model('Item', itemSchema);

