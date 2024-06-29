const Orders = require("../models/orderModel");
const Supplier = require("../models/supplierModel");
const Account = require("../models/accountsModel");
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
    console.log(boughtProducts);

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
    console.log(newOrder);
    await newOrder.save();

    // Update occupiedDays for each supplier
    for (const supplier of items) {
      const foundSupplier = await Supplier.findById(supplier._id);
      foundSupplier.occupiedDays.push(date);
      await foundSupplier.save();
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

const deleteItemFromOrder = async (req, res) => {
  try {
    const { accountID, itemId } = req.query;

    if (!accountID || !itemId) {
      return res.status(400).json({ message: "accountID and itemId required" });
    }

    const account = await Account.findById(accountID);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Find the order containing the item
    const order = await Orders.findOne({
      from: accountID,
      "items._id": itemId,
    });
    if (!order) {
      return res.status(404).json({ message: "Item not found in any orders" });
    }

    // Find the index of the item within the order's items array
    const itemIndex = order.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const item = order.items[itemIndex];

    // Refund the price of the item being deleted
    account.wallet += item.price;
    await account.save();

    // Remove the item from the order's items array
    order.items.splice(itemIndex, 1);
    await order.save();

    res.status(200).json({ message: "Item deleted successfully", order });
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
  deleteItemFromOrder,
};
