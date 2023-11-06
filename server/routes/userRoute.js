const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    getUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Auth route (user registration)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);

module.exports = router;