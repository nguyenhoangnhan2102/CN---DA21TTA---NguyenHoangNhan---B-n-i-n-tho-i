
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

// router.post("/", manufacturerController.createManufacture);

// router.put("/:mathuonghieu", manufacturerController.updateManufacture);

// router.delete("/:mathuonghieu", manufacturerController.deleteManufacture);

module.exports = router;