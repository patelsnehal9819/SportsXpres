const mongoose = require('mongoose');

const aiSizeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recommendationId: {
    type: String,
    required: true,
    unique: true
  },
  height: Number,
  weight: Number,
  age: Number,
  sport: String,
  productType: String,
  fitPreference: String,
  recommendedSize: String,
  sizeGuide: String,
  confidence: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AISize', aiSizeSchema);