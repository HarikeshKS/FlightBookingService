const express = require("express");
const router = express.Router();
const bookingAPIRoutes = require("./booking-routes");
router.use("/bookings", bookingAPIRoutes);

module.exports = router;
