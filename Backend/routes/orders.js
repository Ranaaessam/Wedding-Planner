const router = require("express").Router();
const orderController = require("../controllers/orderController");
const orderMiddleware = require("../middlewares/orderMiddleware");

router.get("/get", orderController.getOrders);
router.get("/getByID", orderController.getOrderByUserIDAndSupplierID);
router.get("/getSupplierTypesByID", orderController.getOrderTypesForUser);
router.get("/getOrdersForUser", orderController.getOrderForUser);
router.get(
  "/getOrderedProductsForUser",
  orderController.getOrderedProductsForUser
);
router.post(
  "/create",
  orderMiddleware.getUserData,
  orderController.createOrder
);
router.delete(
  "/delete",
  orderMiddleware.getUserData,
  orderMiddleware.checkIfOrderExists,
  orderController.deleteOrder
);

router.delete("/refund", orderController.deleteItemFromOrder);

router.get(
  "/PlanPercentage",
  orderMiddleware.getUserData,
  orderController.getPlanPercentage
);
module.exports = router;
