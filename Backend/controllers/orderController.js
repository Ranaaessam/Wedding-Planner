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

const getOrderForUser = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    if (!isValidObjectId(userID)) {
      return res.status(400).json({ message: "Invalid userID format" });
    }

    const orders = await Orders.find({
      from: userID,
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

const getOrderTypesForUser = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "userID required" });
    }

    const orders = await Orders.find({});

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const supplierTypes = await Orders.distinct("supplierType", {
      from: userID,
    });

    return res.status(200).json(supplierTypes);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getOrderedProductsForUser = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "userID required" });
    }

    const orders = await Orders.find({});

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const boughtProducts = await Orders.distinct("to", {
      from: userID,
    });

    return res.status(200).json(boughtProducts);
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
    const { items, date, price, client } = req.body;
    const newOrder = new Orders({
      items: items,
      weddingDate: date,
      from: client._id,

      price: price,
    });

    await newOrder.save();

    for (const supplier of items) {
      supplier.occupiedDays.push(date);
      await supplier.save();
    }

    client.orders.push(newOrder._id);
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
  getOrderTypesForUser,
  getOrderForUser,
  getOrderedProductsForUser,
};
