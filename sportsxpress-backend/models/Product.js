const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['shoes', 'jersey', 'bat', 'ball', 'racket', 'gloves', 'pads', 'helmet', 'accessories', 'kit'],
  },
  sport: {
    type: String,
    required: [true, 'Please add a sport'],
    enum: ['cricket', 'football', 'badminton', 'basketball', 'gym', 'running', 'tennis'],
  },
  sizes: [String],
  colors: [String],
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: 0,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  isKit: {
    type: Boolean,
    default: false,
  },
  kitItems: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
