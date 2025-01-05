
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:makhachhang", cartController.getAllCartByCustomer);
router.post("/", cartController.addToCart);
router.post("/delete", cartController.deleteCartItems);
router.delete("/:magiohang/:masanpham/:mamau", cartController.deleteProductInCart);

module.exports = router;