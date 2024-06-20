const Venues = require("../models/venueModel");
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venues.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllVenues };
