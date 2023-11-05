const express = require("express");
const router = express.Router();

const registerUser = () => { };

// Auth route (user registration)
router.post("/register", registerUser);

module.exports = router;