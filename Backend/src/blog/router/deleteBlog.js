const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const authorization = require("../../../middleware/authorization");

router.delete('/:id', authorization, blogController.deleteBlog);

module.exports = router;