var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = mongoose.Schema({
    name : String,
    username : String,
    phone: String,
    password: String,
    email: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);