const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        res: "User",
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, "Please add the quantity"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "Please add a price to your product"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description of the product"],
        trim: true,
    },
    image: {
        type: Object,
        default: {},
    },
},
    {
        timestamps: true,
    }
);

const Token = mongoose.model("Product", productSchema);
module.exports = Product;