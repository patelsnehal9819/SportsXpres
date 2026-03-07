const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['helmets', 'abdomen-guard', 'batting-pads', 'gloves', 'other']
    },
    originalPrice: {
        type: Number,
        required: [true, 'Original price is required'],
        min: 0
    },
    discountedPrice: {
        type: Number,
        required: [true, 'Discounted price is required'],
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: function() {
            if (this.originalPrice && this.discountedPrice) {
                return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
            }
            return 0;
        }
    },
    offers: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: [true, 'Product image is required']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    stockQuantity: {
        type: Number,
        default: 0,
        min: 0
    },
    description: String,
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Update discount percentage before saving
productSchema.pre('save', function(next) {
    if (this.originalPrice && this.discountedPrice) {
        this.discountPercentage = Math.round(
            ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100
        );
    }
    next();
});

// Virtual for formatted prices
productSchema.virtual('formattedPrices').get(function() {
    return {
        original: `£${this.originalPrice.toLocaleString()}`,
        discounted: `£${this.discountedPrice.toLocaleString()}`
    };
});

// Text search index
productSchema.index({ name: 'text', brand: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;