// controllers/productController.js
const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // ✅ CRITICAL FIX: Explicitly ensure subtitle is in response
        const productsWithSubtitle = products.map(product => {
            const productObj = product.toObject();
            // Ensure subtitle exists, even if empty
            if (!productObj.subtitle) {
                productObj.subtitle = '';
            }
            return productObj;
        });

        console.log('📤 Sending products:', productsWithSubtitle.length);
        res.status(200).json(productsWithSubtitle);
    }
    catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { title, subtitle, description, category, priceVariations } = req.body;
        const image = req.file ? req.file.path : null;

        console.log('📥 Received data:', { title, subtitle, description, category, image: !!image });

        if (!title || !description || !category || !image) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Error deleting orphaned file:', err);
                });
            }
            return res.status(400).json({ message: 'Please fill all required fields, including the image.' });
        }

        // Parse priceVariations if it's a string
        let parsedPriceVariations;
        try {
            parsedPriceVariations = typeof priceVariations === 'string'
                ? JSON.parse(priceVariations)
                : priceVariations;
        } catch (e) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Error deleting orphaned file:', err);
                });
            }
            return res.status(400).json({ message: 'Invalid price variations format' });
        }

        if (!parsedPriceVariations || parsedPriceVariations.length === 0) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Error deleting orphaned file:', err);
                });
            }
            return res.status(400).json({ message: 'At least one price variation is required' });
        }

        // ✅ CRITICAL: Ensure subtitle is always saved, even if empty
        const newProduct = new Product({
            title,
            subtitle: subtitle || '', // Convert undefined/null to empty string
            description,
            category,
            priceVariations: parsedPriceVariations,
            image
        });

        const savedProduct = await newProduct.save();

        // ✅ CRITICAL: Explicitly convert to object to ensure subtitle is included
        const productResponse = savedProduct.toObject();
        if (!productResponse.subtitle) {
            productResponse.subtitle = '';
        }

        console.log('✅ Product saved:', productResponse);
        res.status(201).json(productResponse);

    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { title, subtitle, description, category, priceVariations } = req.body;
        let image;

        console.log('📥 Update request:', { title, subtitle, description, category });

        const product = await Product.findById(req.params.id);

        if (!product) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Error deleting orphaned file on update:', err);
                });
            }
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.file) {
            image = req.file.path;
            if (product.image) {
                fs.unlink(path.resolve(product.image), (err) => {
                    if (err) console.log('Error deleting old image:', err);
                });
            }
        }

        // Parse priceVariations if provided
        let parsedPriceVariations;
        if (priceVariations) {
            try {
                parsedPriceVariations = typeof priceVariations === 'string'
                    ? JSON.parse(priceVariations)
                    : priceVariations;
            } catch (e) {
                return res.status(400).json({ message: 'Invalid price variations format' });
            }
        }

        // ✅ CRITICAL FIX: Properly handle subtitle updates
        product.title = title || product.title;
        // If subtitle is provided (even empty string), use it. Otherwise keep existing.
        product.subtitle = subtitle !== undefined ? subtitle : product.subtitle;
        product.description = description || product.description;
        product.category = category || product.category;
        product.image = image || product.image;

        if (parsedPriceVariations) {
            product.priceVariations = parsedPriceVariations;
        }

        const updatedProduct = await product.save();

        // ✅ CRITICAL: Explicitly convert to object to ensure subtitle is included
        const productResponse = updatedProduct.toObject();
        if (!productResponse.subtitle) {
            productResponse.subtitle = '';
        }

        console.log('✅ Product updated:', productResponse);
        res.status(200).json(productResponse);

    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.image) {
            fs.unlink(path.resolve(product.image), (err) => {
                if (err) console.log('Error deleting image file:', err);
            });
        }

        await product.deleteOne();

        res.status(200).json({ message: 'Product removed' });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};