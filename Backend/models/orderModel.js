const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, required: true }, // Client
  to: { type: mongoose.Schema.Types.ObjectId, required: true }, // Supplier
  weddingDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
