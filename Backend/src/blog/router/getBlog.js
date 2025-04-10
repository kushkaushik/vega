const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const authorization = require("../../../middleware/authorization");

router.get('/', authorization, blogController.getBlogs);

module.exports = router;