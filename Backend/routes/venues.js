const express = require("express");
const router = express.Router();
const VenuesController = require("../controllers/venuesController");

router.get("/", VenuesController.getAllVenues);

module.exports = router;
