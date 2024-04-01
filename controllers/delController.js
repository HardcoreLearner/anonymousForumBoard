const Message = require("../models/message");


exports.deleteMessage = async (req, res) => {
    const id = req.params.id;
    await Message.findByIdAndDelete(id).exec();
    res.redirect("/");
}
