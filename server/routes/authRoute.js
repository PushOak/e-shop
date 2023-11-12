const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    loginStatus,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/logged-in", loginStatus);

module.exports = router;