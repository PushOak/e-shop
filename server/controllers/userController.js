const asyncHandler = require("express-async-handler"); // removes the need to type try/catch block everytime
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Get single user data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
        });
    } else {
        res.status(404);
        throw new Error("User not found!");
    }
});

// Update a user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.bodyphotoe || photo;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    };
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if (!user) {
        res.status(404);
        throw new Error("User not found! Please login in or sign up.");
    };

    // Validate
    if (!oldPassword || !password) {
        res.sendStatus(400);
        throw new Error("Please add old and new password.");
    };

    // Check if old password matches the new password in the DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // Save new password to DB
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Password changed successfully.");
    } else {
        res.send(400);
        throw new Error("Old password is incorrect.");
    }
});

// New function for me 
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("Sorry does not exit!");
    };

    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    };

    // Create reset token
    let resetToken = crypto
        .randomBytes(32)
        .toString("hex")
        + user._id;
    console.log(resetToken);

    // Hash token before saving to DB
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Save token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
    }).save();

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    // Reset email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password.</p>
        <p>This reset link is valid only for 30 minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>With best regards...</p>
        <p>Pinvent Team</p>
    `;

    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Reset email sent!" });
    } catch (error) {
        res.status(500);
        throw new Error("Something went wrong! Email not sent, please try again.");
    };
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    // Hash token then compare it to the token in DB
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Find token in DB
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or expired token.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find user and update the hashed password
    const user = await User.findById(userToken.userId);
    user.password = hashedPassword; // Update to use the hashed password
    await user.save();

    res.status(200).json({
        message: "Password reset successful, you may now login."
    });
});

module.exports = {
    getUser,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
};