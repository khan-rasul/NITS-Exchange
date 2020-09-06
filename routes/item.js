var express = require('express');
var router = express.Router();
var Item = require("../models/item");
var middleware = require("../middleware");

// root route
router.get("/" , function(req , res){
    Item.find({} , function(err , items){
        if(err){
            console.log(err);
        }
        else{
            res.render("item/index" , {items : items});
        }
    })  
});

// add new item
router.get("/new" , middleware.isLoggedIn, function(req , res){
    res.render("item/new");
});

router.post("/", middleware.isLoggedIn, function(req , res){
    Item.create(req.body.item , function(err , newItem) {
        if(err){
            console.log(err);
        }
        else{
            newItem.author.id = req.user._id;
            newItem.author.name = req.user.name;
            newItem.save();
            res.redirect("/item");
        }
    });
});

// view item
router.get("/:id" , function(req , res){
    Item.findById(req.params.id).populate("comments").exec( function(err , item){
        if(err){
            console.log(err);
        }
        else{
            res.render("item/show" , {item: item});
        }
    })
});

// export module
module.exports = router;