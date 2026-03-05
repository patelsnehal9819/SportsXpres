const mongoose = require('mongoose');

const starterKitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  kitId: {
    type: String,
    required: true,
    unique: true
  },
  sport: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  budget: {
    type: Number,
    required: true
  },
  selectedKit: {
    name: String,
    price: Number,
    items: [{
      name: String,
      price: Number,
      image: String
    }]
  },
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  purchased: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('StarterKit', starterKitSchema);