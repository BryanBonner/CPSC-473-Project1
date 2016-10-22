var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var app = express();
User = require('./models/user');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);
console.log('Running on port 3000');


// Mongoose
mongoose.connect('mongodb://localhost/auth');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

// Initalizes passport and creates a session
app.use(passport.initialize());
app.use(passport.session());

// Salts and Hashes users password
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// set up our routes
app.get('/', function(req, res) {
    res.render('index');
});

// Register page
app.get("/register", function(req, res) {
    res.render("register");
});

// register post
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/successfull");
        });
    });
});
