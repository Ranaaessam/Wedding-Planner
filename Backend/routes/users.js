const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const userValidator = require("../middlewares/userMWValidator");
const authValidator = require("../middlewares/authMWvalidator");

router.get("/", UsersController.getAllUsers);
router.post("/Registration", userValidator, UsersController.Registration);
router.post("/verify", UsersController.verifyOTP);
router.post("/Login", authValidator, UsersController.Login);
router.post("/invite", UsersController.invite);

module.exports = router;
