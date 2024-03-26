const bcrypt = require("bcryptjs");
const User = require("../models/user");


exports.signup_get = (req, res) => {
    res.render("sign-up");
};
exports.signup_post = async (req, res, next) => {
    const data = req.body;
    const fname = data.fname;
    const lname = data.lname;
    const username = data.username;
    const password = data.password;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        } else {
            const newUser = new User({
                first_name: fname,
                last_name: lname,
                username: username,
                password: hashedPassword
            });
            await newUser.save();
            res.redirect("/");
        }
    });
};
exports.signin_get = (req, res) => {
    res.render("sign-in");
};
