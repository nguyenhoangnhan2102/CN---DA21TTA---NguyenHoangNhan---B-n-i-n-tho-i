
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.confirmOrder);
router.put("/:madonhang", orderController.updateOrders);

module.exports = router;