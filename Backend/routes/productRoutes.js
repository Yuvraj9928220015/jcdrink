// routes/productRoutes.js
const Product = require('../models/productModel');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

router.get("/product/:slug", async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    }
}).single('image');

const handleUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

router.get('/', getProducts);

router.post('/', handleUpload, addProduct);

router.put('/:id', handleUpload, updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;