const Message = require("../models/message");
const User = require("../models/user");

exports.join_get = async (req, res) => {
    res.render("join-club", {message:""});
}

exports.join_post = async (req, res) => {
    const answer = req.body.passcode;
    const answerLower = answer.toLowerCase();
    if (answerLower == "nothing") {
        const newMember = await User.findById(req.user.id).exec();
        newMember.member = true;
        await newMember.save();
        res.render("join-club", {message: "You have successfully join the club !"});
    } else {
        res.render("join-club", {message: "Wrong Password"});
    }
};
