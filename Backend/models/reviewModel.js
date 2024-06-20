const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Review collection
const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  rate: {
    type: Number,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Reviews", reviewSchema);

module.exports = Review;
