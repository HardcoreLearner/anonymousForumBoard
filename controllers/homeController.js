const Message = require("../models/message");
const User = require("../models/user");

exports.home_get = async (req, res) => {
    const allMessages = await Message.find().populate("author").sort({date: 1}).exec();
    res.render("home", { user: req.user, messages: allMessages });
}

exports.new_message = async (req, res) => {
    const message = req.body.message;
    const newMessage = new Message({
        author: req.user.id,
        message: message
    });
    await newMessage.save();
    res.redirect("/");
};
