const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliersController");

router.get("/", SuppliersController.getAllSuppliers);

module.exports = router;
