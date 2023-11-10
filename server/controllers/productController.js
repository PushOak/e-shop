const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
    res.send("Created a Product");
});

module.exports = {
    createProduct,
}