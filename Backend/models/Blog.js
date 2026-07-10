const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    urlHandle: { type: String, required: true, unique: true }, // slug
    author: { type: String, default: 'JC DRINK' },
    image: { type: String },        // cover image path
    altTag: { type: String },
    content: { type: String, required: true },
    pageTitle: { type: String },       // Meta Title
    metaDescription: { type: String },
    script: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);