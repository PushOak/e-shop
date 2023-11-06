const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Auth route (user registration)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loggedIn", loginStatus);
router.patch("/updateUser", protect, updateUser);

module.exports = router;