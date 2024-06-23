const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Registration = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User already has an account!");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = new User({ ...req.body, password: hashedPassword });

    await user.save();
    const token = jwt.sign({ userID: user._id }, "WeddingPlannerSecretKey");
    res.header("x-auth-token", token);
    res.status(200).send("Registered Successfully!");
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).send({
      message: "An error occurred during registration",
      error: err.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = jwt.sign({ userID: user._id }, "WeddingPlannerSecretKey");
    res.header("x-auth-token", token);
    res.status(200).send("Logged in successfully");
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .send({ message: "An error occurred during login", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  Registration,
  Login,
};
