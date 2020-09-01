var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser");

//============
// app config
//============
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));

//================
// require routes
//================
var indexRoutes = require("./routes/index");

//============
// use routes
//============
app.use('/', indexRoutes);

//=====================
// listen on port 3000
//=====================
app.listen(3000 , function(){
    console.log("Server Started on port 3000. :)");
});