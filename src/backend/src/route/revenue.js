
const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/ngay", revenueController.getRevenueByDay);

module.exports = router;