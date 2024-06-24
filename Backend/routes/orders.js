const router = require("express").Router();
const orderController = require("../controllers/orderController");
const orderMiddleware = require("../middlewares/orderMiddleware");

router.get("/get", orderController.getOrders);
router.get("/getByID", orderController.getOrderByUserIDAndSupplierID);
router.post(
  "/create",
  orderMiddleware.getUserData,
  orderMiddleware.checkForID,
  orderMiddleware.checkIfDateIsAvailable,
  orderController.createOrder
);
router.delete(
  "/delete",
  orderMiddleware.getUserData,
  orderMiddleware.checkIfOrderExists,
  orderController.deleteOrder
);
module.exports = router;
