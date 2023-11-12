const express = require("express");
const router = express.Router();
const {
    getUser,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/get-user", protect, getUser);
router.patch("/update-user", protect, updateUser);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;