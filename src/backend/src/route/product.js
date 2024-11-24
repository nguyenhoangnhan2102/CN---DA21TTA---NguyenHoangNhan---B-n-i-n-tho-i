
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);

router.get("/:masanpham", productController.getDetailProduct);

router.post("/", productController.createProduct);

router.put("/:masanpham", productController.updateProduct);

router.delete("/:masanpham", productController.deleteProduct);

module.exports = router;