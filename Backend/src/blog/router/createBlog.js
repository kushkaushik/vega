const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const validateJoi = require("../../../middleware/schemaMiddleware");
const { blogSchema } = require("../module/blogSchema");
const upload = require("../../../middleware/multer");
const authorization = require("../../../middleware/authorization");

router.post('/create-blog', authorization, upload.single('image'), validateJoi(blogSchema), blogController.createBlog);

module.exports = router;