const express = require("express");
const router = express.Router();
const UsersControllersb= require("../controllers/usersControllers");

router.get("/",UsersControllersb.getAllUsers);

module.exports = router;
