module.exports = {
    isAuthenticated: function(req, res, next) {
        console.log(req.session.passport);
        if (typeof req.session.passport == "undefined") {
            console.log("aya");
            res.redirect("/");
        } else {
            return next();
        }
    }
}