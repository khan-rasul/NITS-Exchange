var mongoose = require("mongoose");
var Item = require("./models/item");
var data = [
    {title: "Drafter" , price: 150},
    {title: "Apron" , price: 200},
    {title: "Grewal" , price: 300},
    {title: "Cycle" , price: 1000},
    {title: "EG Kit" , price: 80}
];

function seedDB(){
    Item.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Items Removed");
    });
    data.forEach(function(item){
        Item.create(item , function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Item Added");
            }
        });
    });
}
module.exports = seedDB;