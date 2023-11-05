const asyncHandler = require("express-async-handler"); // removes the need to type try/catch block everytime
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all of the required fields.");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("The password must be up to 6 characters.");
    }

    // Check if user email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(404);
        throw new Error("This email already exists.");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else {
        res.status(400);
        throw new Error("Ivalid user data!");
    }
});

module.exports = {
    registerUser
};