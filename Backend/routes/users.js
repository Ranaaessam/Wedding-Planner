const express = require("express");
const router = express.Router();
const UsersControllers= require("../controllers/usersController");
const userValidator = require ("../middlewares/userMWValidator");
const authValidator = require("../middlewares/authMWvalidator");



router.get("/",UsersControllers.getAllUsers);
router.post("/Registration",userValidator,UsersControllers.Registration);
router.post("/Login",authValidator,UsersControllers.Login);

module.exports = router;
