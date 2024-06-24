const User = require("../models/userModel");
const Account = require("../models/accountsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const Registration = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(400).send("User already has an account!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    await user.save();

    // Set default values if not provided in req.body
    const weddingdate = req.body.weddingdate || null;
    const location = req.body.location || '';
    const budget = req.body.budget || 0;

    const account = new Account({
      user1Id: user._id,
      weddingdate: weddingdate,
      location: location,
      budget: budget,
    });

    await account.save();

    const token = jwt.sign({ userId: user._id }, "WeddingPlannerSecretKey");

    res.header("x-auth-token", token);
    res.status(200).json({
      message: "Registered Successfully!",
      accountId: account._id,
      userId: user._id,
    });
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

   
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = jwt.sign({ userId: user._id }, "WeddingPlannerSecretKey");

    const account = await Account.findOne({
      $or: [{ user1Id: user._id }, { user2Id: user._id }]
    });

    res.header("x-auth-token", token);
    res.status(200).json({
      message: "Logged in successfully",
      userId: user._id,
      accountId: account ? account._id : null, 
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "An error occurred during login", error: err.message });
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
