const User = require("../models/userModel");
const Account = require("../models/accountsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');


const Registration = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    if (user) {
      return res.status(400).send("User already has an account!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user = new User({
      email: req.body.email.toLowerCase(),
      name: req.body.name,
      password: hashedPassword,
    });

    await user.save();

    // Set default values if not provided in req.body
    const weddingdate = req.body.weddingdate || null;
    const location = req.body.location || "";
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
    let user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();

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

    const token = jwt.sign({ userId: user._id }, "WeddingPlannerSecretKey");

    const account = await Account.findOne({
      $or: [{ user1Id: user._id }, { user2Id: user._id }],
    });

    res.header("x-auth-token", token);
    res.status(200).json({
      message: "Logged in successfully",
      userId: user._id,
      accountId: account ? account._id : null,
    });
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

const invite = async (req, res) => {
  try {
    const accountId = req.body.accountId;
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: `Account with ID ${accountId} not found` });
    }

    // Find the sender user to get the password
    let senderUser;
    let senderName;
    if (account.user1Id) {
      // If user1Id exists, fetch the sender user from the User model
      senderUser = await User.findById(account.user1Id);
      if (senderUser) {
        senderName = senderUser.name;
      } else {
        return res.status(404).json({ error: `User with ID ${account.user1Id} not found` });
      }
    } else {
      // Handle case where user1Id doesn't exist (though it should ideally exist)
      return res.status(400).json({ error: `Account with ID ${accountId} does not have user1Id populated` });
    }

    // Check if the user already exists by email
    let existingUser = await User.findOne({ email: req.body.email });

    // If user does not exist, create a new user
    if (!existingUser) {
      existingUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: senderUser.password, // Use the sender user's password
      });
    }

    // Determine which user ID field to populate based on whether user2Id is already set
    const userFieldToUpdate = account.user1Id ? 'user2Id' : 'user1Id';
    account[userFieldToUpdate] = existingUser._id;

    // Save the updated account
    await account.save();

    // Send an email to the user with the generated password (if needed)
    //await sendEmail(req.body.email, req.body.name, senderName, senderUser.password);

    console.log(`User ${req.body.name} (${req.body.email}) added to account ${accountId} with the same password as the sender user`);
    
    // Send success response
    return res.status(200).json({ message: `User ${req.body.name} (${req.body.email}) added to account ${accountId} successfully` });
  } catch (error) {
    console.error("Error inviting user:", error);
    // Send error response
    return res.status(500).json({ error: "Error inviting user", details: error.message });
  }
};





// const sendEmail = async (email, name, senderName, password) => {
//   try {
//     // Create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'weddingplanner746542@gmail.com', // Replace with your email
//         pass: 'weddingPlannerPassword', // Replace with your password
//       },
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: 'weddingplanner746542@gmail.com', // Sender address (must be the same as auth.user)
//       to: email, // List of receivers
//       subject: 'You have been added to a wedding planner account', // Subject line
//       text: `Dear ${name},\n\nYou have been added to a wedding planner account by ${senderName}. Your temporary password is: ${password}\n\nPlease log in and change your password as soon as possible.\n\nBest regards,\nWedding Planner Team`, // Plain text body
//     });

//     console.log("Email sent:", info.response);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return false;
//   }
// };
module.exports = {
  getAllUsers,
  Registration,
  Login,
  invite
};
