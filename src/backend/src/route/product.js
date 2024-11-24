
const express = require("express");
const router = express.Router();
const productController = require("../controllers/homeControllerProduct");
const upload = require("../config/multerConfig");

router.get("/", productController.getAllProduct);

// router.get("/:masanpham", productController.getDetailProduct);

// router.delete("/:masanpham", productController.deleteProduct);

// router.post("/", productController.createProduct);

// router.put("/:masanpham", productController.updateProduct);

module.exports = router;