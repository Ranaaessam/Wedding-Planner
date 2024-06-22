const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliersController");

router.get("/", SuppliersController.getAllSuppliers);
router.get("/filter", SuppliersController.filterSuppliers);
router.get("/:id", SuppliersController.getSuppliersByID);
router.post("/", SuppliersController.createSupplier);
router.delete("/:id", SuppliersController.deleteSupplier);
router.patch("/:id", SuppliersController.updateSupplier);

module.exports = router;
