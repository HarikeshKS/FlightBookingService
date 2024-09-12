const express = require("express");
const BookingController = require("../../controllers/booking-controller");
const router = express.Router();

router.post("/", BookingController.create);

module.exports = router;
