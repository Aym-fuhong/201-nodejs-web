import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  type: String
});

module.exports = mongoose.model('Category', categorySchema);