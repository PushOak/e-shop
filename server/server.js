const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactUsRoute = require("./routes/contactUsRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://e-shop!.vercel.app"],
    credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes middleware
app.use("/api/auth", authRoute); // to refactor the userController later 
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact-us", contactUsRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Homepage");
});

const PORT = process.env.PORT || 5000;

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDb and start the server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));