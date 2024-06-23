const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviewsController");

router.get("/", ReviewsController.getAllReviews);
router.post("/",ReviewsController.addReview);

module.exports = router;
