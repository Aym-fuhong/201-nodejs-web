import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  size: Number,
  items: [
    {
      count: Number,
      item: {
        type: Schema.ObjectId,
        ref: 'Item'
      }
    }
  ],

});

module.exports = mongoose.model('Cart', cartSchema);