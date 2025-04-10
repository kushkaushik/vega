const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const validateJoi = require("../../../middleware/schemaMiddleware");
const { editBlogSchema } = require("../module/blogSchema");
const upload = require("../../../middleware/multer");
const authorization = require("../../../middleware/authorization");

router.patch('/:id', authorization, upload.single('image'), validateJoi(editBlogSchema), blogController.editBlog);

module.exports = router;