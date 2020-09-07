var Comment = require('../models/comment');
var Item = require('../models/item');
var User = require('../models/user');
module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/signin');
  },
  checkItemOwnership: function(req, res, next){
    if(req.isAuthenticated()){
      Item.findById(req.params.id, function(err, item){
        if(err || !item){
            console.log(err);
            req.flash('error', 'Sorry, that item does not exist!');
            res.redirect('/item');
        } else if(item.author.id.equals(req.user._id)){
            next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/item/' + req.params.id);
        }
      });
      return;
    }
    req.flash('error', 'You must be signed in to do that!');
    res.redirect('/signin');
  },
  checkCommentOwnership: function(req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.commentId, function(err, comment){
        if(err || !comment){
            console.log(err);
            req.flash('error', 'Sorry, that comment does not exist!');
            res.redirect('/item');
        } else if(comment.author.id.equals(req.user._id)){
              next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/item/' + req.params.id);
        }
      });
      return;
    }
    req.flash('error', 'You must be signed in to do that!');
    res.redirect('/signin');
  },
  checkUserOwnership: function(req, res, next){
    if(req.isAuthenticated()){
      User.findById(req.params.id, function(err, user){
        if(err || !user){
            console.log(err);
            req.flash('error', 'Sorry, that User does not exist!');
            res.redirect('/user');
        } else if(user._id.equals(req.user._id)){
            next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/user/' + req.params.id);
        }
      });
      return;
    }
    req.flash('error', 'You must be signed in to do that!');
    res.redirect('/signin');
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  }
}