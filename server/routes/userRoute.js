const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Auth route (user registration)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/get-user", protect, getUser);
router.get("/logged-in", loginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;