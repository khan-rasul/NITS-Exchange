var mongoose = require("mongoose");
var Item = require("./models/item");
var Comment = require("./models/comment");
var User = require("./models/user");
const user = require("./models/user");

var data = [
    {title: "Drafter" , price: 150},
    {title: "Apron" , price: 200},
    {title: "Grewal" , price: 300},
    {title: "Cycle" , price: 1000},
    {title: "EG Kit" , price: 80}
];
var users = [
    {
        name: "Eivor",
        username: "1715037",
        email: "eivor@valhalla.sky",
        phone: "1234567890"
    },
    {
        name: "Kassandra",
        username: "1715011",
        email: "kassandra@odyssey.gr",
        phone: "9876543210"
    }
]

function seedDB(){
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Comments removed");
        }
    });
    User.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Users removed");
            users.forEach(function(user){
                User.register(user , "password", function(err , user){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(user.name + " Added");
                    }
                })
            })
        }
    });
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