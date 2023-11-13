const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;

    // Product validation
    if (!name || !category || !quantity || !price || !description) {
        res.status(400);
        throw new Error("Please fill in all of the fields.");
    }

    // Handle file upload
    let fileData = {};
    if (req.file) {
        // Save a file to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "E-shop App", resource_type: "image" });
        } catch (error) {
            res.status(500);
            throw new Error("Something went wrong! File could not be uploaded.");
        };

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
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

// Get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(products);
});

// Get a single product
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // if a product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    };

    // match a product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized.");
    };

    res.status(200).json(product);
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // if a product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    };

    // match a product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized.");
    };

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    // if product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    };

    // match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    };

    // Handle file upload
    let fileData = {};
    if (req.file) {
        // Save a file to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "E-shop App",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("Something went wrong! File could not be uploaded.");
        };

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    };

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product?.image : fileData,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedProduct);
});

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};