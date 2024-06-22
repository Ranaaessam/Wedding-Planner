const Venues = require("../models/venueModel");
const { isValidObjectId } = require("mongoose");

// #region Get All Venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venues.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Get Venue By Id

const getVenueById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue id" });
    }
    const venue = await Venues.findById(req.params.id);
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Filter Venues
const filterVenues = async (req, res) => {
  try {
    const { rate, price, location, name } = req.query;

    let query = {};

    if (name) {
      query.name = new RegExp(name, "i");
    }

    if (rate) {
      query.rate = { $gte: rate };
    }

    if (price) {
      query.price = { $lte: price };
    }

    if (location) {
      query.location = location;
    }

    console.log(query);
    const venues = await Venues.find(query);

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error filtering venues", error });
  }
};

module.exports = { filterVenues };

// #endregion

// #region Create Venue
const createVenue = async (req, res) => {
  const venue = new Venues({
    name: req.body.name,
    location: req.body.location,
    rate: req.body.rate,
    images: req.body.images,
    cakes: req.body.cakes,
    cars: req.body.cars,
    price: req.body.price,
    caterer: req.body.caterer,
  });
  try {
    const newVenue = await venue.save();
    res.status(201).json("Venue created successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// #endregion

// #region Delete Venue
const deleteVenue = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue id" });
    }
    await Venues.findByIdAndDelete(req.params.id);
    return res.json({ message: "Venue deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Update Venue
const updateVenue = async (req, res) => {
  try {
    let newVenue = req.body.newVenue;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid venue id" });
    }

    const venue = await Venues.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    let updatedVenue = { ...venue.toObject(), ...newVenue };
    await Venues.findByIdAndUpdate(req.params.id, updatedVenue);
    return res.json({ message: "Venue updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// #endregion

module.exports = {
  getAllVenues,
  getVenueById,
  filterVenues,
  createVenue,
  deleteVenue,
  updateVenue,
};
