var mongoose = require("mongoose");
var itemSchema = mongoose.Schema({
    title : String,
    price : Number
});
module.exports = mongoose.model("Item" , itemSchema);