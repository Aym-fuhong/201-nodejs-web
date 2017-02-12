import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  price: Number,
  cartId: {type: [],ref: 'Cart'},
  categoryId: {type: Schema.ObjectId,ref: 'Category'}
});

module.exports = mongoose.model('Item', itemSchema);

