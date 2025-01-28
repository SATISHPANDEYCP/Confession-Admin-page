const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require("serve-favicon");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");

dotenv.config();

const app = express();

app.use(
    cookieSession({
        name: "session",
        secret: process.env.SESSION_SECRET,
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

app.use("/admin", adminRoutes);
app.use("/", authRoutes);      

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
