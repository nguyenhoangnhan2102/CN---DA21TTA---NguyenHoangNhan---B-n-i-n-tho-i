const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.post("/users/register", userController.registerUser);

router.post("/users/login", userController.loginUser);

router.post("/users/profile", userController.getUserProfile);

router.put("/users/update/:makhachhang", authenticateToken, userController.updateUser);

router.post("/verify-admin", userController.verifyAdmin);

router.get("/users", userController.getAllUser);

module.exports = router;