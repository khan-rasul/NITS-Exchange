var express = require('express');
var router = express.Router();
var Item = require("../models/item");
var middleware = require("../middleware");


// root route
router.get("/" , function(req , res){
    var category = req.query.category;
    if(req.query.category === undefined){
        category = ['Sale', 'Rent', 'Share'];
    }
    Item.find({
        category: { $in: category }
    }).populate("author").exec(function(err , items){
        if(err){
            console.log(err);
        }
        else{
            res.render("item/index" , {items : items, category: category});
        }
    }); 
});

// add new item
router.get("/new" , middleware.isLoggedIn, function(req , res){
    res.render("item/new");
});

router.post("/", [middleware.isLoggedIn, middleware.upload], function(req , res){
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
});

// view item
router.get("/:id", function(req , res){
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
router.get("/:id/edit", middleware.checkItemOwnership, function(req , res){
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
router.put("/:id", [middleware.isLoggedIn, middleware.upload], function(req , res){
    var updatedImg = [];
    req.files.forEach(function(file){
        updatedImg.push({data: file.buffer, contentType: "image/jpeg"});
    });
    Item.findById(req.params.id, function(err, item){
        if(err){
            console.log(err);
        }
        else{
            req.body.item.images = updatedImg;
            Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, item){
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

// delete item
router.delete("/:id", middleware.checkItemOwnership, function(req , res){
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