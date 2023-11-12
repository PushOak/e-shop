const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { contactUs } = require("../controllers/contactUsController");

router.post("/", protect, contactUs);

module.exports = router;