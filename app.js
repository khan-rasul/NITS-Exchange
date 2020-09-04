var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    seedDB         = require("./seed"),
    methodOverride = require("method-override");

//============
// app config
//============
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//================
// database config
//================
seedDB();
mongoose.connect("mongodb://localhost/Exchange" , {useNewUrlParser: true , useUnifiedTopology: true});

//================
// require routes
//================
var indexRoutes = require("./routes/index"),
    userRoutes  = require("./routes/user"),
    itemRoutes  = require("./routes/item"),
    commentRoutes  = require("./routes/comment")

//============
// use routes
//============
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/item' , itemRoutes);
app.use("/item/:id/comments", commentRoutes);

//=====================
// listen on port 3000
//=====================
app.listen(3000 , function(){
    console.log("Server Started on port 3000. :)");
});