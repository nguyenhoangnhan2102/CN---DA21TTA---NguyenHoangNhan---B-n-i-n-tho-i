
const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/day", revenueController.getRevenueByDay);

module.exports = router;