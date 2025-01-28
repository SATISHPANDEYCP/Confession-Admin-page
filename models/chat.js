const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        maxLength: 1000,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400
    },
    approved: {
        type: Boolean,
        default: false
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
