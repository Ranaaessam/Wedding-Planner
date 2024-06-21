const { isValidObjectId } = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
// const Complaint = require("../models/complaintModel");
const Supplier = require("../models/supplierModel");
// #region User Management
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// #endregion

// #region Supplier Management
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    return res.status(200).json(suppliers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid supplier id" });
    }
    await Supplier.findByIdAndDelete(id);
    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// #endregion

// #region Order Management
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    await Order.findByIdAndDelete(id);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// #endregion

// #region Complaint Management
const getComplaints = async (req, res) => {
  try {
    // const complaints = await Complaint.find({});
    // return res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// #endregion
module.exports = {
  getUsers,
  deleteUser,
  getSuppliers,
  deleteSupplier,
  getOrders,
  deleteOrder,
  getComplaints,
};