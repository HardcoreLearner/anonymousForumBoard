const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    club: { type: Schema.Types.ObjectId, ref: "ClubHouse" },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true, unique: true },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);