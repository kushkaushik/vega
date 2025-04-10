const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validateJoi = require("../../../middleware/schemaMiddleware");
const { signupSchema } = require("../module/userSchema");
const upload = require("../../../middleware/multer");

router.post("/signup", upload.single('image'), validateJoi(signupSchema), userController.registerUser);

module.exports = router;