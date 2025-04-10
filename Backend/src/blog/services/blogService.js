const cloudinary = require('../../../utils/cloudinary');
const Blog = require('../module/blogModule');

const createBlog = async (title, description, imageBuffer, userId) => {

  const cloudinaryResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'blogs' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(imageBuffer);
  });

  const blog = new Blog({
    title,
    description,
    image: cloudinaryResponse.secure_url,
    userId
  });

  await blog.save();
  return blog;
};

const getBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

const getBlogById = async (id) => {
  return await Blog.findById(id);
};

const editBlog = async (id, title, description, imageBuffer) => {
  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;

  if (imageBuffer) {
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'blogs' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(imageBuffer);
    });

    updateData.image = cloudinaryResponse.secure_url;
  }

  return await Blog.findByIdAndUpdate(id, updateData, { new: true });
};


const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getBlogs,
  editBlog,
  deleteBlog,
  getBlogById
};
