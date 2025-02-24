const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

function isAuthenticated(req, res, next) {
    console.log("Session:", req.session);
    if (req.session && req.session.isAuthenticated) {
        console.log("User is authenticated.");
        return next();
    }
    console.log("User is not authenticated. Redirecting...");
    res.redirect("/login");
}

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(req.session.user);
    if (username === process.env.USER && password === process.env.PASS) {
        req.session.isAuthenticated = true;
        res.redirect("/admin/chats");
    } else {
        return res.status(401).render("wrong.ejs", {
            msg: {
                m1: "Oops! Invalid credentials",
                m2: "Please verify the details and try again with the correct information."
            }
        });
    }
});

router.get("/logout", (req, res) => {
    req.session = null;
    console.log("cookies deleted.");
    res.redirect("/");
});

module.exports = router; 
