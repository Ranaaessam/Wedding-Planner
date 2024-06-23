const Reviews = require("../models/reviewModel");
const Suppliers= require("../models/supplierModel");
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { review, rate, to, from } = req.body;
    if (!review || !rate || !to || !from) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newReview = new Reviews({
      review,
      rate,
      to,
      from,
    });
    await newReview.save();
    const supplier = await Suppliers.findById(to);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }
    const allReviews = await Reviews.find({ to });

    // Calculate new average rating
    const totalRating = allReviews.reduce((sum, review) => sum + review.rate, 0);
    const numberOfReviews = allReviews.length;
    const newAverageRating = totalRating / numberOfReviews;

    // Update the supplier's rating
    supplier.rate = newAverageRating;
    await supplier.save();

    res.status(201).json({ message: 'Review added and supplier rating updated successfully.', review: newReview });
  } catch (err) {
    console.error('Error adding review and updating supplier rating:', err);
    res.status(500).json({ message: 'An error occurred while adding the review and updating the supplier rating.', error: err.message });
  }
};

const getReviewsBySupplierID = async (req, res) => {
  const { SupplierID } = req.params;
  try {
    const reviews = await Reviews.find({ to: SupplierID }); 
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this supplier.' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews by "to" field:', err);
    res.status(500).json({ message: 'An error occurred while fetching reviews.', error: err.message });
  }
};


module.exports = { getAllReviews ,
                   addReview,
                   getReviewsBySupplierID
};
