const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router.use(adminMiddleware.checkIfAdmin);

// #region User Management
router.get("/users", adminController.getUsers);
router.get("/allUsers", adminController.getAllUsers);

router.delete("/users/:id", adminController.deleteUser);
// #endregion

// #region Order Management
router.get("/orders", adminController.getOrders);
router.delete("/orders/:id", adminController.deleteOrder);
// #endregion

// #region Supplier Management
router.get("/suppliers", adminController.getSuppliers);
router.delete("/suppliers/:id", adminController.deleteSupplier);
// #endregion

// #region Complaint Management
router.get("/complaints", adminController.getComplaints);
// #endregion

module.exports = router;
