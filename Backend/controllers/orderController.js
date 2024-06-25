const Orders = require("../models/orderModel");
const Supplier = require("../models/supplierModel");
const { isValidObjectId } = require("mongoose");

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getOrderByUserIDAndSupplierID = async (req, res) => {
  try {
    const { userID, supplierID } = req.query;

    if (!userID || !supplierID) {
      return res
        .status(400)
        .json({ message: "userID and supplierID are required" });
    }

    if (!isValidObjectId(userID) || !isValidObjectId(supplierID)) {
      return res
        .status(400)
        .json({ message: "Invalid userID or supplierID format" });
    }

    const orders = await Orders.find({
      from: userID,
      to: supplierID,
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Helper function to validate ObjectId format
const createOrder = async (req, res) => {
  try {
    const { supplierID, date, client } = req.body;
    const supplier = await Supplier.findById(supplierID);
    const newOrder = new Orders({
      to: supplierID,
      weddingDate: date,
      from: client._id,
      supplierType: supplier.type,
    });

    await newOrder.save();
    supplier.occupiedDays?.push(date);
    await supplier.save();
    client.orders?.push(newOrder._id);
    await client.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    const order = Orders.findById(orderID);
    const supplier = Supplier.findById(order.to);
    const client = Supplier.findById(order.from);
    supplier.occupiedDays = supplier.occupiedDays.filter(
      (date) => date !== order.weddingDate
    );
    await supplier.save();
    client.orders = client.orders.filter((order) => order !== orderID);
    await client.save();
    await Orders.findByIdAndDelete(orderID);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPlanPercentage = async (req, res) => {
  try {
    const client = req.body.client;
    const orderIDs = client.orders;
    const supplierTypes = new Set();
    for (const orderID of orderIDs) {
      const order = await Orders.findById(orderID);
      if (order && order.supplierType) {
        supplierTypes.add(order.supplierType);
      }
    }

    const count = supplierTypes.size;
    const percentage = (count / 3) * 100;
    res.status(200).json({ percentage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports = {
  getOrders,
  getOrderByUserIDAndSupplierID,
  createOrder,
  deleteOrder,
  getPlanPercentage,
};
