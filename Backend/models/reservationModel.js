const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  supplierID: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  }
});

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
