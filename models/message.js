const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now, required: true },
    message: { type: String, required: true },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);