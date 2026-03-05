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
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  productType: {
    type: String,
    required: true
  },
  fitPreference: {
    type: String,
    enum: ['tight', 'regular', 'loose']
  },
  recommendedSize: {
    type: String,
    required: true
  },
  sizeGuide: String,
  confidence: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AISize', aiSizeSchema);