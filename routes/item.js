var express = require('express');
var router = express.Router();
var upload = require("../middleware/upload");
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
    upload(req, res, (err) => {
        if(err){
            if(err.code === "LIMIT_FILE_SIZE"){
                req.flash('error', 'File too large. Allowed maximum file size is 10MB.');
                res.redirect("/item/new");
            }
            else if (err.code === "LIMIT_UNEXPECTED_FILE"){
                req.flash('error', 'Too many files. Upload maximum 5 files.');
                res.redirect("/item/new");
            }
            else if(err === "FILE_TYPE"){
                req.flash('error', 'Allowed file types are jpg, jpeg and png!');
                res.redirect("/item/new");
            }
        }
        else{
            // console.log(req.files);
            Item.create(req.body.item, function(err, newItem) {
            if(err){
                console.log(err);
            }
            else{
                newItem.author.id = req.user._id;
                newItem.author.name = req.user.name;
                req.files.forEach(function(file){
                    newItem.images.push({data: file.buffer, contentType: "image/jpeg"});
                });
                newItem.save();
                res.redirect("/item");
            }
        });
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

// edit item
router.get("/:id/edit" , function(req , res){
    Item.findById(req.params.id, function(err, item){
        if(err){
            console.log(err);
        }
        else{
            res.render("item/edit", {item: item});
        }
    });
});

// update item
router.put("/:id" , function(req , res){
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, item){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/item/" + req.params.id);
        }
    });
});

// delete item
router.delete("/:id" , function(req , res){
    Item.findByIdAndRemove(req.params.id, function(err, item){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/item");
        }
    });
});

// export module
module.exports = router;