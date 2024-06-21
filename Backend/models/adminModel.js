const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Admins = mongoose.model("admin", adminSchema);
module.exports = Admins;
