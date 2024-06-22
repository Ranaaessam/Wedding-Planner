const express = require("express");
const router = express.Router();
const VenuesController = require("../controllers/venuesController");

router.get("/", VenuesController.getAllVenues);
router.get("/filter", VenuesController.filterVenues);
router.get("/:id", VenuesController.getVenueById);
router.post("/", VenuesController.createVenue);
router.delete("/:id", VenuesController.deleteVenue);
router.patch("/:id", VenuesController.updateVenue);

module.exports = router;
