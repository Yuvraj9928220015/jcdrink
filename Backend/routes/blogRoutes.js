const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  uploadImage,
} = require('../controllers/blogController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  },
});


const upload = multer({
  storage,
  limits: {
    fieldSize: 50 * 1024 * 1024, 
    fileSize: 10 * 1024 * 1024,  
  },
});


function handleUpload(uploadMiddleware) {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        console.error('Upload Error:', err.message);
        return res.status(400).json({ success: false, message: 'Upload failed: ' + err.message });
      }
      next();
    });
  };
}

router.post('/upload-image', handleUpload(upload.single('image')), uploadImage);
router.post('/', handleUpload(upload.single('image')), createBlog);
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:slug', handleUpload(upload.single('image')), updateBlog);
router.delete('/:slug', deleteBlog);

module.exports = router;