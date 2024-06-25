const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Review collection
const reviewSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  details: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
    default: "",
  },
});

const Complaint = mongoose.model("Complaints", reviewSchema);

module.exports = Complaint;
