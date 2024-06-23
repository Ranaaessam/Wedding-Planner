const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviewsController");

router.get("/", ReviewsController.getAllReviews);
router.post("/",ReviewsController.addReview);
router.get("/:SupplierID",ReviewsController.getReviewsBySupplierID)

module.exports = router;
