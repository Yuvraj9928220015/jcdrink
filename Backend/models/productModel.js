// models/productModel.js
const mongoose = require('mongoose');

const priceVariationSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ['100 ML', '160 ML', '200 ML', '200 ML', '250 ML', '300 ML', '500 ML', '600 ML', '600ML', '800 ML']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

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

// Virtual field to get min and max price
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

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);