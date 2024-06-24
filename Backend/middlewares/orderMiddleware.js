const Account = require("../models/accountsModel");
const Orders = require("../models/orderModel");
const Supplier = require("../models/supplierModel");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

const getUserData = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, "WeddingPlannerSecretKey");
    const account = await Account.find({
      $or: [{ user1Id: decoded.userID }, { user2Id: decoded.userID }],
    });
    console.log(account);
    if (!account) {
      return res.status(400).json({ message: "Invalid account ID!" });
    }

    req.body.client = account;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token.", error: error.message });
  }
};

const checkForID = async (req, res, next) => {
  try {
    const { supplierID } = req.body;
    if (!supplierID || !isValidObjectId(supplierID)) {
      return res.status(400).json({ message: "Invalid Supplier ID" });
    }

    const supplier = await Supplier.findById(supplierID);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const checkIfDateIsAvailable = async (req, res, next) => {
  try {
    const { supplierID, date } = req.body;
    if (!supplierID || !date) {
      return res
        .status(400)
        .json({ message: "Supplier ID and Date are required" });
    }

    const supplier = await Supplier.findById(supplierID);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // console.log(supplier.occupiedDays);
    // console.log(new Date(date).toISOString());
    const dateToCheck = new Date(date).toISOString();
    const isDateOccupied = supplier.occupiedDays.some(
      (occupiedDate) => new Date(occupiedDate).toISOString() === dateToCheck
    );

    if (isDateOccupied) {
      return res.status(400).json({ message: "Date not available" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const checkIfOrderExists = async (req, res, next) => {
  try {
    const { orderID } = req.body;
    if (!orderID || !isValidObjectId(orderID)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const order = await Orders.findById(orderID);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getUserData,
  checkForID,
  checkIfDateIsAvailable,
  checkIfOrderExists,
};
