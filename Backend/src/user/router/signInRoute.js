const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validateJoi = require("../../../middleware/schemaMiddleware");
const { signinSchema } = require("../module/userSchema");

router.post("/signin", validateJoi(signinSchema), userController.loginUser);

module.exports = router;