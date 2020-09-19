var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Chat = require("../models/chat");
var mongoose = require("mongoose");
var middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function(req , res){
    User.findById(req.params.id , function(err , user){
        if(err){
            console.log(err);
        }
        else{
            res.render("chat/index" , {user : user});
        }
    })
})
router.post("/", middleware.isLoggedIn, function(req , res){
    User.findOne({username: req.body.username}, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/user/" + req.params.id + "/chat");
        }
        else{
            var firstUser = req.params.id;
            var secondUser = user._id.toString();
            var chatId = (firstUser < secondUser ? firstUser + secondUser : secondUser + firstUser);
            Chat.countDocuments({_id: chatId} , function(err , count){
                if(err){
                    console.log(err);
                    res.redirect("/user/" + req.params.id + "/chat");
                }
                else{
                    if(count == 0){
                        Chat.create({firstUser : mongoose.Types.ObjectId(firstUser) , secondUser: mongoose.Types.ObjectId(secondUser), _id: chatId}, function(err , chat){
                            if(err){
                                console.log(err);
                                res.redirect("/user/" + req.params.id + "/chat");
                            }
                            else{
                                res.redirect("/user/" + req.params.id + "/chat/" + chatId);
                            }
                        })
                    }
                    else{
                        res.redirect("/user/" + req.params.id + "/chat/" + chatId);
                    }
                }
            })
        }
    });
})
router.get("/:chatId", middleware.isLoggedIn, function(req , res){
    Chat.findById(req.params.chatId , function(err , chat){
        if(err){
            console.log(err);
        }
        else{
            res.render("chat/show", {chat: chat , sender: req.params.id});
        }
    })
});
// export module
module.exports = router;