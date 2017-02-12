import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  size: Number
});

module.exports = mongoose.model('Cart', cartSchema);