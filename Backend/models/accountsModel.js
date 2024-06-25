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
    default: null,
  },
  weddingdate: {
    type: Date,
  },
  budget: {
    type: Number,
    default: 0,
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
    type: String,
  },
  image: {
    type: String,
    default:
      "https://forum.truckersmp.com/uploads/monthly_2020_07/imported-photo-88117.png.8bae4530449aac746a528004ed4539dc.png",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      default: [],
    },
  ],
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
