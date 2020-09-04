var express = require('express');
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Comment = require("../models/comment");

// create new comment
router.post("/", function(req , res){
    Item.findById(req.params.id, function(err, item){
        if(err){
            console.log(err);
        } 
        else {
            Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                // comment.author.id = req.user._id;
                // comment.author.username = req.user.username;
                comment.author = "Neetya";
                comment.save();
                item.comments.push(comment);
                item.save();
                res.redirect('/item/' + item._id);
            }
         });
        }
    });
});

//delete comment
router.delete("/:commentId", function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){      
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/item/" + req.params.id);
        } 
    });
});

// export module
module.exports = router;