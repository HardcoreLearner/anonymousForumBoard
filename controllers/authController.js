const bcrypt = require("bcryptjs");
const User = require("../models/user");


exports.register_get = (req, res) => {
    res.render("register");
};
exports.register_post = async (req, res, next) => {
    const data = req.body;
    const fname = data.fname;
    const lname = data.lname;
    const username = data.username;
    const password = data.password;
    const cpassword = data.cpassword;
    if (password != cpassword) {
        return res.render("register", {error: "passwords not matching!"});
    }
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
exports.login_get = (req, res) => {
    res.render("login");
};
