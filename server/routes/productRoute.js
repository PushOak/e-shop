const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createProduct);
router.get("/all-products", protect, getProducts);
router.get("/:id", protect, getSingleProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;