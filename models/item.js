var mongoose = require("mongoose");
var itemSchema = mongoose.Schema({
    title : String,
    price : Number,
    images:[
        { 
            data: Buffer, 
            contentType: String 
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("Item" , itemSchema);