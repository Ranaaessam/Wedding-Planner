const Suppliers = require("../models/supplierModel");
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Suppliers.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllSuppliers };
