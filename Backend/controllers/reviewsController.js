const Reviews = require("../models/reviewModel");
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllReviews };
