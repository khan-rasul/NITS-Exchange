var express = require('express');
var router = express.Router();
var upload = require("../middleware/upload");
var Item = require("../models/item");


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
router.get("/new" , function(req , res){
    res.render("item/new");
});

router.post("/", function(req , res){
    upload(req, res, (err) => {
        if(err){
            console.log(error);
            if (error.code === "LIMIT_UNEXPECTED_FILE")
            res.send("Upload max 5 files.");
            // error to be included in flash message
            // res.redirect("item/new");
        }
        else{
            console.log(req.files);
            // var imgUrls = [];
            // req.files.forEach(function(file){
            //     var img = {path: "file/"+file.filename, type: file.id};
            //     imgUrls.push(img);
            // });
            // Item.create(req.body.item, function(err, item) {
            // if(err){
            //     console.log("error " + err);
            // }
            // else{
            //     item.images = imgUrls;
            //     item.save();
            //     console.log(item);
            //     res.redirect("/item");
            // }
        // });
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