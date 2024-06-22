const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  user2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  weddingdate: {
    type: Date
  },
  favourites: {
    type: [Object],
    default: [],
  },
  cart: {
    type: [Object],
    default: [],
  },
  location: {
    type: String
  },
  image: {
    type: String,
    default: '',
  },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;