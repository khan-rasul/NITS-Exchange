var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    seedDB        = require("./seed");

//============
// app config
//============
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));

//================
// database config
//================
seedDB();
mongoose.connect("mongodb://localhost/Exchange" , {useNewUrlParser: true , useUnifiedTopology: true});

//================
// require routes
//================
var indexRoutes = require("./routes/index");
var itemRoutes = require("./routes/item")

//============
// use routes
//============
app.use('/', indexRoutes);
app.use('/item' , itemRoutes);

//=====================
// listen on port 3000
//=====================
app.listen(3000 , function(){
    console.log("Server Started on port 3000. :)");
});