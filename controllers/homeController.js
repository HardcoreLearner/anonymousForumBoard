exports.home_get = (req, res) => {
    res.render("home", { user: req.user});
}