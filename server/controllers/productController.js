const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");

const createProduct = asyncHandler(async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const { name, sku, category, quantity, price, description } = req.body;

    // Product validation
    if (!name || !category || !quantity || !price || !description) {
        res.status(400);
        throw new Error("Please fill in all of the fields.");
    }

    // Handle image upload
    let fileData = {};
    if (req.file) {
        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    };

    // Create a single product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    res.status(201).json(product);
});

module.exports = {
    createProduct,
};