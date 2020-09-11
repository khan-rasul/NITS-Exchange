var Comment = require('../models/comment');
var Item = require('../models/item');
var User = require('../models/user');

var multer = require("multer"),
    path   = require("path");

module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/signin');
  },
  upload: function(req, res, next) {
    var upload = multer({
      storage: multer.memoryStorage(),
      limits: {fileSize: 10000000},
      fileFilter: function(req, file, cb){
        var filetypes=/jpeg|jpg|png/;
        var extname = filetypes.test(path.extname(file.originalname));
        var mimetype = filetypes.test(file.mimetype);
        if(extname && mimetype)
          return cb(null, true);
        else cb("FILE_TYPE");
      }
    }).array("images", 5);
    upload(req, res, function (err) {
      if(err){
        if(err.code === "LIMIT_FILE_SIZE"){
            req.flash('error', 'File too large. Allowed maximum file size is 10MB.');
            res.redirect("back");
        }
        else if (err.code === "LIMIT_UNEXPECTED_FILE"){
            req.flash('error', 'Too many files. Upload maximum 5 files.');
            res.redirect("back");
        }
        else if(err === "FILE_TYPE"){
            req.flash('error', 'Allowed file types are jpg, jpeg and png!');
            res.redirect("back");
        }
    } else{
      next();
    }
    });
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