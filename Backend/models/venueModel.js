const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  cakes: [
    {
      name: String,
      image: String,
    },
  ],
  cars: [
    {
      name: String,
      image: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  caterer: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],
});

const Venue = mongoose.model("Venues", venueSchema);

module.exports = Venue;
