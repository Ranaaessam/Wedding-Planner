const { isValidObjectId } = require("mongoose");
const Supplier = require("../models/supplierModel");

// #region Get All Suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Get Supplier By Id

const getSuppliersByID = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid supplier id" });
    }
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Filter Suppliers
const filterSuppliers = async (req, res) => {
  try {
    const { type, rate, price, location, name } = req.query;

    let query = {};

    if (type) {
      query.type = new RegExp(`^${type}$`, "i");
    }

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
    const suppliers = await Supplier.find(query);

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error filtering Suppliers", error });
  }
};

// #endregion

// #region Create Supplier
const createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.json({ message: "Supplier created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// #endregion

// #region Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid supplier id" });
    }
    await Supplier.findByIdAndDelete(req.params.id);
    return res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// #endregion

// #region Update Supplier
const updateSupplier = async (req, res) => {
  try {
    let newSupplier = req.body.supplier;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Supplier id" });
    }

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    let updatedSupplier = { ...supplier.toObject(), ...newSupplier };
    await Supplier.findByIdAndUpdate(req.params.id, updatedSupplier);
    return res.json({ message: "Supplier updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// #endregion

module.exports = {
  getAllSuppliers,
  getSuppliersByID,
  filterSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier,
};
