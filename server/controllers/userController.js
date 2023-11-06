const asyncHandler = require("express-async-handler"); // removes the need to type try/catch block everytime
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all of the required fields.");
    };

    if (password.length < 6) {
        res.status(400);
        throw new Error("The password must be up to 6 characters.");
    };

    // Check if user email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(404);
        throw new Error("This email already exists.");
    };

    // Encrypt password before saving it to DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie 
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Ivalid user data!");
    };
});

// Login existing user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add an email and password.");
    };

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found, please sign up.");
    };

    // If user exists, check if the password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate token
    const token = generateToken(user._id);

    if (passwordIsCorrect) {
        // Send HTTP-only cookie 
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        });
    }

    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password.");
    }
});

// User logout
const logout = asyncHandler(async (req, res) => {
    // Expire the cookie method
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });

    return res.status(200).json({ message: "User successfully logged out." });
});

module.exports = {
    registerUser,
    loginUser,
    logout,
};