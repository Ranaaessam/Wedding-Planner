const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliersController");

router.get("/", SuppliersController.getAllSuppliers);
router.get("/filtersuppliersByType", SuppliersController.filtersuppliersByType);
router.get("/getSuppliersByID", SuppliersController.getSuppliersByID);


module.exports = router;
