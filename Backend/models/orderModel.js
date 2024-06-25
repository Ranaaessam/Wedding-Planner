const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, required: true }, // Client
  items: { type: Array, required: true },
  weddingDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, required: true },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
