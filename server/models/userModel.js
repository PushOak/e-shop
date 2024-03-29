const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name."],
    },
    email: {
        type: String,
        required: [true, "Please add an email."],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email.",
        ],
    },
    password: {
        type: String,
        required: [true, "Please a a password"],
        minLength: [6, "Password must be up to 6 characters in length."],
        // maxLength: [23, "Password must not be more than 23 characters in length."],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo."],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
        type: String,
        default: "+972",
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",
    },
},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema)

module.exports = User;