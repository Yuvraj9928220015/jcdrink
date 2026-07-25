const mongoose = require('mongoose');
const Blog = require('../models/Blog');

// UPLOAD IMAGE (MDX editor ke andar inline images ke liye)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const url = `${baseUrl}/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, url });
  } catch (error) {
    console.error('Upload Image Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, author, content, altTag, pageTitle, metaDescription, urlHandle, script } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const exists = await Blog.findOne({ urlHandle });
    if (exists) {
      return res.status(400).json({ success: false, message: 'URL handle already used, dusra try karein.' });
    }

    const blog = new Blog({ title, author, content, altTag, pageTitle, metaDescription, urlHandle, script, image });
    const saved = await blog.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Create Blog Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
exports.getBlogs = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('getBlogs called but Mongo readyState =', mongoose.connection.readyState);
      return res.status(503).json({
        success: false,
        message: 'Database connection not ready, thodi der me try karein',
      });
    }

    const blogs = await Blog.find()
      .select('-content -script')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(blogs);
  } catch (error) {
    console.error('❌ Get Blogs Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE (by urlHandle)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ urlHandle: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
};

// UPDATE (by urlHandle)
exports.updateBlog = async (req, res) => {
  try {
    const { title, author, content, altTag, pageTitle, metaDescription, urlHandle, script } = req.body;
    const updateData = { title, author, content, altTag, pageTitle, metaDescription, urlHandle, script };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Blog.findOneAndUpdate(
      { urlHandle: req.params.slug },
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update Blog Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE (by urlHandle)
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ urlHandle: req.params.slug });
    if (!deleted) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
};