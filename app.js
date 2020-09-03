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
<<<<<<< HEAD
var indexRoutes = require("./routes/index"),
    userRoutes  = require("./routes/user");
=======
var indexRoutes = require("./routes/index");
var itemRoutes = require("./routes/item")
>>>>>>> d7d50840053948850ae7e00a8a278ff8464681c9

//============
// use routes
//============
app.use('/', indexRoutes);
<<<<<<< HEAD
app.use('/user', userRoutes);
=======
app.use('/item' , itemRoutes);
>>>>>>> d7d50840053948850ae7e00a8a278ff8464681c9

//=====================
// listen on port 3000
//=====================
app.listen(3000 , function(){
    console.log("Server Started on port 3000. :)");
});