const Suppliers = require("../models/supplierModel");
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Suppliers.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const filtersuppliersByType = async (req, res) => {
  try {
    const { type } = req.body;
    const suppliers = await Suppliers.find({ type });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getSuppliersByID = async (req, res) => {
  try {
    const { id } = req.body; 
    const supplier = await Suppliers.findById(id); 

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(supplier); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllSuppliers ,
                   filtersuppliersByType,
                   getSuppliersByID
                  };
