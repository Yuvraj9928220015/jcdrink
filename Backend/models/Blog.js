const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    urlHandle: { type: String, required: true, unique: true },
    author: { type: String, default: 'JC DRINK' },
    image: { type: String },
    altTag: { type: String },
    content: { type: String, required: true },
    pageTitle: { type: String },
    metaDescription: { type: String },
    script: { type: String },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });


module.exports = mongoose.model('Blog', blogSchema);