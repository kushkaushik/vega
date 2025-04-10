const blogService = require('../services/blogService');
const { STATUS_CODES, MESSAGES } = require('../../../constants/constant')

const createBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.user;
    if (!req.file || !title || !description || !userId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.MISSING_FIELDS });
    }

    const imageBuffer = req.file.buffer;

    const blog = await blogService.createBlog(title, description, imageBuffer, userId);
    console.log(blog)
    res.status(STATUS_CODES.CREATED).json({
      message: 'Blog created successfully!',
      blog,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const { id } = req.query;

    const blogs = id
      ? await blogService.getBlogById(id)
      : await blogService.getBlogs();

    if (id && !blogs) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: 'Blog not found' });
    }

    res.status(STATUS_CODES.SUCCESS).json({ blogs });
  } catch (error) {
    next(error);
  }
};


const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageBuffer = req.file?.buffer;

    const updatedBlog = await blogService.editBlog(id, title, description, imageBuffer);

    res.status(STATUS_CODES.SUCCESS).json({
      message: 'Blog updated successfully!',
      blog: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await blogService.deleteBlog(id);

    res.status(STATUS_CODES.SUCCESS).json({
      message: 'Blog deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  editBlog,
  deleteBlog,
};