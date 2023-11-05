const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// Auth route (user registration)
router.post("/register", registerUser);

module.exports = router;