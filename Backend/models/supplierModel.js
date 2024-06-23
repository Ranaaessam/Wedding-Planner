const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
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
  price: {
    type: Number,
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
  caterer: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],
  occupiedDays: {
    type: [Date],
    default: [],
  },
});

const Supplier = mongoose.model("Suppliers", supplierSchema);

module.exports = Supplier;
