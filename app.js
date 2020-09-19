var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    seedDB         = require("./seed"),
    methodOverride = require("method-override"),
    passport       = require("passport"),
    flash          = require("connect-flash"),
    localStrategy  = require("passport-local").Strategy,
    User           = require("./models/user"),
    compression    = require("compression");

//============
// app config
//============
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(compression());
app.locals.moment = require('moment');

//================
// require routes
//================
var indexRoutes    = require("./routes/index"),
    userRoutes     = require("./routes/user"),
    itemRoutes     = require("./routes/item"),
    commentRoutes  = require("./routes/comment");

//=================
// database config
//=================
mongoose.connect("mongodb://localhost/Exchange" , {useNewUrlParser: true , useUnifiedTopology: true});
seedDB();

//=================
// passport config
//=================
app.use(require("express-session")({
    secret: "Colt Steele taught me this",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================
// user middleware
//=================
app.use(function(req , res , next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//============
// use routes
//============
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/item' , itemRoutes);
app.use('/item/:id/comment', commentRoutes);

//========================
// listening on port 3000
//========================
app.listen(3000 , function(){
    console.log("Server Started on port 3000. :)");
});