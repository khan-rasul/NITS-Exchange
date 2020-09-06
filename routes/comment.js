var express = require('express');
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// create new comment
router.post("/", middleware.isLoggedIn ,function(req , res){
    Item.findById(req.params.id, function(err, item){
        if(err){
            console.log(err);
        } 
        else {
            Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                comment.author.id = req.user._id;
                comment.author.name = req.user.name;
                comment.save();
                item.comments.push(comment);
                item.save();
                res.redirect('/item/' + item._id);
            }
         });
        }
    });
});

//update comment
router.put("/:commentId", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/item/" + req.params.id);
        }
    });
});

//delete comment
router.delete("/:commentId", middleware.checkCommentOwnership, function(req, res){
    Item.findByIdAndUpdate(req.params.id, {
      $pull: {
        comments: req.params.commentId
      }
    }, function(err) {
      if(err){ 
            console.log(err);
      } else {
            Comment.findByIdAndRemove(req.params.commentId, function(err){      
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/item/" + req.params.id);
            } 
        });
      }
    });
  });

// export module
module.exports = router;