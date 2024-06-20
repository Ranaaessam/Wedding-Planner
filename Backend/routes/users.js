const express = require("express");
const router = express.Router();
const UsersControllersb = require("../controllers/usersController.js");

router.get("/", UsersControllersb.getAllUsers);

module.exports = router;
