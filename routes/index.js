var express = require("express");
var router = express.Router();
var passport = require("passport");

// root route
router.get("/" , function(req , res){
    res.render("landing");
})

// sign in form
router.get("/signin" , function(req , res){
    res.render("signin");
})

// sign in logic
router.post("/signin" ,passport.authenticate("local", 
{
    successRedirect: "/item",
    failureRedirect: "/signin"
}), function(req, res){
});

// sign out
router.get("/signout" , function(req , res){
    // console.log(req.headers.referer);
    req.logout();
    res.redirect("back");

})
// export module
module.exports = router;