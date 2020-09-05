var express = require("express");
var router = express.Router();
var passport = require("passport");

// root route
router.get("/" , function(req , res){
    res.render("landing");
})

// sign in
router.get("/signin" , function(req , res){
    res.render("signin");
})
router.post("/signin" ,passport.authenticate("local", 
{
    successRedirect: "/user",
    failureRedirect: "/signin"
}), function(req, res){
});

// sign out
router.get("/signout" , function(req , res){
    req.logout();
    res.redirect("/user");

})
// export module
module.exports = router;