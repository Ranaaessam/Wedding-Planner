
const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/reservationController");

router.get("/", ReservationController.getAllreservations);
router.post("/",ReservationController.createReservation);
router.get("/:SupplierID",ReservationController.getReservationBySupplierID);

module.exports = router;
