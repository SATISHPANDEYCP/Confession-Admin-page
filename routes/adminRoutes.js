const express = require("express");
const router = express.Router();
const chat = require("../models/chat.js");
const authRoutes = require("./authRoutes.js");


function isAuthenticated(req, res, next) {
    console.log("Session:", req.session);
    if (req.session && req.session.isAuthenticated) {
        console.log("User is authenticated.");
        return next();
    }
    console.log("User is not authenticated. Redirecting...");
    res.redirect("/");
}

router.get("/chats",isAuthenticated, async (req, res) => {
    try {
        const unapprovedChats = await chat.find({ approved: false }).sort({ created_at: -1 });
        const approvedMassage = await chat.find({ approved: true }).sort({ created_at: -1 });
        res.render("admin", { chats: unapprovedChats, massage:approvedMassage });
    } catch (error) {
        console.error("Error fetching unapproved chats:", error);
        res.status(500).send("An error occurred while retrieving unapproved chats.");
    }
});

router.post("/chats/:id/approve",isAuthenticated, async (req, res) => {
    try {
        const chatId = req.params.id;
        await chat.findByIdAndUpdate(chatId, { approved: true });
        res.redirect("/admin/chats");
    } catch (error) {
        console.error("Error approving chat:", error);
        res.status(500).send("An error occurred while approving the chat.");
    }
});

router.post("/chats/:id/delete",isAuthenticated, async (req, res) => {
    try {
        const chatId = req.params.id;
        await chat.findByIdAndDelete(chatId);
        res.redirect("/admin/chats");
    } catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).send("An error occurred while deleting the chat.");
    }
});

module.exports = router;
