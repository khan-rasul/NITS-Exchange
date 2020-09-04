var mongoose = require("mongoose");
var Item = require("./models/item");
var Comment = require("./models/comment");

var data = [
    {title: "Drafter" , price: 150},
    {title: "Apron" , price: 200},
    {title: "Grewal" , price: 300},
    {title: "Cycle" , price: 1000},
    {title: "EG Kit" , price: 80}
];

function seedDB(){
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed comments");
        }
    })
    Item.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Items Removed");
        data.forEach(function(item){
            Item.create(item, function(err, item){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Item Added");
                    Comment.create({
                        text: "Seed Comment",
                        author: "Neetya"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            item.comments.push(comment);
                            item.save();
                            console.log("Added comment");
                        }
                    });
                }
            });
        });
    });
}
module.exports = seedDB;