// models/productModel.js
const mongoose = require('mongoose');

// IMPORTANT: These sizes MUST match EXACTLY with frontend AVAILABLE_SIZES array
const VALID_SIZES = [
    '100 ML',
    '160 ML',
    '200 ML - 24 Pack',
    '200 ML - 30 Pack',
    '250 ML',
    '300 ML',
    '500 ML',
    '600 ML',
    '600 ML - With Sugar',
    '750 ML'
];

// Price Variation Schema
const priceVariationSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: VALID_SIZES
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

// Main Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    priceVariations: {
        type: [priceVariationSchema],
        required: [true, 'Please add at least one price variation'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one price variation is required'
        }
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    }
}, {
    timestamps: true
});

// Middleware to validate unique sizes before saving
productSchema.pre('save', function(next) {
    const sizes = this.priceVariations.map(v => v.size);
    const uniqueSizes = new Set(sizes);
    
    if (sizes.length !== uniqueSizes.size) {
        return next(new Error('Duplicate sizes are not allowed'));
    }
    
    next();
});

// Virtual price range field
productSchema.virtual('priceRange').get(function () {
    if (!this.priceVariations || this.priceVariations.length === 0) {
        return { min: 0, max: 0 };
    }
    const prices = this.priceVariations.map(v => v.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
});

// Include virtual fields in JSON & object responses
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Log valid sizes when model loads (for debugging)
console.log('✅ Product Model Loaded');
console.log('📋 Valid Sizes:', VALID_SIZES);

module.exports = mongoose.model('Product', productSchema);