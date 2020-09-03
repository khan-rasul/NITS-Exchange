var express = require('express');
var router = express.Router();

var user = {
    name: "Neetya Pasari",
    username: 1715011,
    email: "neetyapasari09@gmail.com",
    phone: 9101013881
};

// root route
router.get("/", function(req, res){
    res.render("user/index", {user:user});
});

// edit user details route
router.get("/:id/edit", function(req, res){
    res.render("user/edit", {user:user});
});

// update user details route
router.post("/:id", function(req, res){
    res.redirect("/");
});

// export module
module.exports = router;