var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Item = require("../models/item");
const middleware = require("../middleware");

// root route
router.get("/", function(req, res){
    User.find({} , function(err , users){
        if(err){
            console.log(err);
        }
        else{
            res.render("user/index", {users: users});
        }
    });
});

// register a new user
router.get("/new" , function(req , res){
    res.render("user/new");
})

router.post("/" , function(req , res){
    var newUser = new User({
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email
    });
    User.register(newUser , req.body.password, function(err , user){
        if(err){
            console.log(err);
            return res.render("user/new", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/user"); 
         });
    })
});

// user profile show route
router.get("/:id" , function(req , res){
    User.findById(req.params.id , function(err , user){
        if(err){
            console.log(err);
        }
        else{
            Item.find({author: {id : user._id , name : user.name} }, function(err, items){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("user/show", {user: user, items: items});
                }
            });
        }
    })
});

// edit user details route
router.get("/:id/edit", middleware.checkUserOwnership, function(req, res){
    User.findById(req.params.id , function(err , user){
        if(err){
            console.log(err);
        }
        else{
            res.render("user/edit", {user : user});
        }
    })
});
router.put("/:id", middleware.checkUserOwnership, function(req , res){
    User.findByIdAndUpdate(req.params.id , req.body.user, function(err , user){
        if(err){
            console.log(err);
        }
        else if(req.body.password){
            console.log(user);
            user.setPassword(req.body.password , function(err , user){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(user);
                    user.save();
                }
            })
        }
        res.redirect( "/user");
    });
});
router.delete("/:id", middleware.checkUserOwnership, function(req , res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/user/" + req.params.id);
        }
        else{
            res.redirect("/user");
        }
    })
})
// export module
module.exports = router;