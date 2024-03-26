const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, required: true, enum: ["normal", "admin"], default: "normal" }
});

UserSchema.virtual("fullname").get(function() {
    return this.first_name + " " + this.last_name;
});

// Export model
module.exports = mongoose.model("User", UserSchema);