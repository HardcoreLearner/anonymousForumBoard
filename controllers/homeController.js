const Message = require("../models/message");

exports.home_get = (req, res) => {
    res.render("home", { user: req.user});
}

exports.new_message = async (req, res) => {
    const message = req.body.message;
    console.log(message);
    const newMessage = new Message({
        author: user.id,
        message: message
    });
    await newMessage.save();
    res.redirect("/");
};
