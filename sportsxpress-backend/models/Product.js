const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  discount: Number,
  description: String,
  rating: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 100
  },
  image: String,
  sizes: [String],
  colors: [String],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);