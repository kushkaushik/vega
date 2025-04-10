const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorization = require('../../../middleware/authorization')

router.get("/profile",authorization , userController.userProfile);

module.exports = router;