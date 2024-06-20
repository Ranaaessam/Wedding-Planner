const express = require("express");
const router = express.Router();
const UsersControllersb = require("../controllers/usersControllers.js");

router.get("/", UsersControllersb.getAllUsers);

module.exports = router;
