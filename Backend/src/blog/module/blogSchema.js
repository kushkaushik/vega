const Joi = require('joi');

const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  image: Joi.any().required(),
  userId: Joi.string().min(8),
});


const editBlogSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    image: Joi.any(),
    userId: Joi.string().min(8),
});

module.exports = { blogSchema, editBlogSchema };
