const Orders = require("../models/orderModel");
const Supplier = require("../models/supplierModel");

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

const createOrder = async (req, res) => {
  try {
    const { supplierID, date, client } = req.body;
    const newOrder = new Orders({
      to: supplierID,
      weddingDate: date,
      from: client._id,
    });

    await newOrder.save();
    const supplier = await Supplier.findById(supplierID);
    supplier.occupiedDays?.push(date);
    await supplier.save();
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
    await Orders.findByIdAndDelete(orderID);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
};
