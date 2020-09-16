var mongoose = require("mongoose");

var chatSchema = mongoose.Schema({
    _id: String,
    firstUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    secondUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [{
        receiver: String,
        content: String
    }]
});

module.exports = mongoose.model("Chat", chatSchema);