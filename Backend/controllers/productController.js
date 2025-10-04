// controllers/productController.js
const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } 
    catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {

        const { title, description, price, category } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !description || !price || !category || !image) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Error deleting orphaned file:', err);
                });
            }
            return res.status(400).json({ message: 'Please fill all fields, including the image.' });
        }

        const newProduct = new Product({
            title,
            description,
            category,
            price,
            image
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        let image;

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

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);

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