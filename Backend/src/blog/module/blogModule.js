const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Blog description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Blog image URL is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  }
},{
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
