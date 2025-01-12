
const express = require("express");
const router = express.Router();
const colorProductController = require("../controllers/colorProductController");

router.get("/", colorProductController.getAllColorProduct);

router.post("/", colorProductController.createColorProduct);

router.put("/:mamau", colorProductController.updateColorProduct);

router.delete("/:mamau", colorProductController.deleteColorProduct);

module.exports = router;