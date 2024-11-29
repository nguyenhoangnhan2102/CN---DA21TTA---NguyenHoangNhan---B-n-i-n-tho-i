
const express = require("express");
const router = express.Router();
const colorProductController = require("../controllers/colorProductController");

router.get("/", colorProductController.getAllColorProduct);

router.post("/", colorProductController.createColorProduct);

// router.put("/:mathuonghieu", manufacturerController.updateManufacture);

// router.delete("/:mathuonghieu", manufacturerController.deleteManufacture);

module.exports = router;