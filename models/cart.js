import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  name: String,
  weight: Number,
  Items: {type: [],ref: 'Item'}
});

module.exports = mongoose.model('Cart', cartSchema);