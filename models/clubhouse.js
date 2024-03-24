const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClubHouseSchema = new Schema({
    name: { type: String, required: true },
    owner : { type: Schema.Types.ObjectId, ref: "User" },
    password: { type: String, required: true }
});

ClubHouseSchema.virtual("fullname").get(function() {
    return this.first_name + " " + this.last_name;
});

// Export model
module.exports = mongoose.model("ClubHouse", ClubHouseSchema);