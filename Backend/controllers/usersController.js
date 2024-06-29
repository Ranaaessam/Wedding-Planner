const User = require("../models/userModel");
const Account = require("../models/accountsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Registration = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    if (user) {
      return res.status(400).send("User already has an account!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user = new User({
      email: req.body.email.toLowerCase(),
      name: req.body.name,
      password: hashedPassword,
      otp: otp,
    });

    await user.save();

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

    await user.save();
    console.log(otp);
    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hire.hustle1@gmail.com",
        pass: "ipozfcndqykqpslz",
      },
    });

    const mailOptions = {
      from: '"Wedding Planner" <hire.hustle1@gmail.com>',
      to: user.email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
      } else {
        console.log("OTP email sent:", info.response);
      }
    });

    const token = jwt.sign({ userId: user._id }, "WeddingPlannerSecretKey");

    res.header("x-auth-token", token);
    res.status(200).json({
      message: "Registered Successfully! Please check your email for the OTP.",
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
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    console.log(user.otp);
    console.log(otp);
    if (user && user.otp == otp) {
      user.otp = 0;
      await user.save();
      res.status(200).send({ success: true });
    } else {
      res.status(400).send({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).send({
      message: "An error occurred while verifying OTP",
      error: err.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
   // console.log(user);

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

const generatePassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  // Ensure the password has at least one uppercase letter, one lowercase letter, and one number
  const getRandomUppercase = () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  const getRandomLowercase = () =>
    "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  const getRandomNumber = () => "0123456789"[Math.floor(Math.random() * 10)];

  // Add at least one uppercase letter, one lowercase letter, and one number
  password += getRandomUppercase();
  password += getRandomLowercase();
  password += getRandomNumber();

  // Fill the rest of the password with random characters
  for (let i = 3; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the password to ensure the required characters are not always at the start
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

const sendEmail = async (email, name, senderName, password) => {
  try {
    
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "weddingplanner746542@gmail.com", 
        pass: "dkrg umvk tqez ubhm", 
      },
    });

   
    let subject, text;
    if (password) {
      subject = "You have been added to a wedding planner account";
      text = `Dear ${name},\n\nYou have been added to a wedding planner account by ${senderName}. Your temporary password is: ${password}\n\nPlease log in and change your password as soon as possible.\n\nBest regards,\nWedding Planner Team`;
    } else {
      subject = "You have been added to a wedding planner account";
      text = `Dear ${name},\n\nYou have been added to a wedding planner account by ${senderName}.\n\nBest regards,\nWedding Planner Team`;
    }

    
    let info = await transporter.sendMail({
      from: '"weddingplanner" <weddingplanner746542@gmail.com>', 
      to: email, 
      subject: subject,
      text: text, 
    });

    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const invite = async (req, res) => {
  try {
    const accountId = req.body.accountId;
    const account = await Account.findById(accountId);
   // console.log(account);
    if (!account) {
      return res
        .status(404)
        .json({ error: `Account with ID ${accountId} not found` });
    }

   
    let senderUser;
    let senderName;
    if (account.user1Id) {
      
      senderUser = await User.findById(account.user1Id);
      console.log(senderUser);
      if (senderUser) {
        senderName = senderUser.name;
      } else {
        return res
          .status(404)
          .json({ error: `User with ID ${account.user1Id} not found` });
      }
    } else {
      
      return res.status(400).json({
        error: `Account with ID ${accountId} does not have user1Id populated`,
      });
    }

   
    let existingUser = await User.findOne({ email: req.body.email });

    let password = null;
    if (!existingUser) {
      
      password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      
      existingUser = await User.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: hashedPassword, 
      });
    }
    await existingUser.save();
  
    account["user2Id"] = existingUser._id;

   
    await account.save();

   
    await sendEmail(req.body.email, req.body.name, senderName, password);

    console.log(
      `User ${req.body.name} (${
        req.body.email
      }) added to account ${accountId} with ${
        password ? "a new password" : "an existing account"
      }`
    );

    
    return res.status(200).json({
      message: `User ${req.body.name} (${req.body.email}) added to account ${accountId} successfully`,
    });
  } catch (error) {
    console.error("Error inviting user:", error);
    
    return res
      .status(500)
      .json({ error: "Error inviting user", details: error.message });
  }
};
//dkrg umvk tqez ubhm
module.exports = {
  getAllUsers,
  Registration,
  verifyOTP,
  Login,
  invite,
};
