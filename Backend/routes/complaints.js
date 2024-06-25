const router = require("express").Router();

const complaintsController = require("../controllers/complaintsController");

router.get("/", complaintsController.getComplaints);
router.post("/", complaintsController.createComplaint);

module.exports = router;
