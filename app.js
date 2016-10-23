var express = require('express');
var http = require('http');
var cons = require('consolidate');
var path = require('path');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var app = express();
var User = require('./models/user');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//fixes the Access-Control-Allow-Origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);
console.log('Running on port 3000');


// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://473:project1@ds039674.mlab.com:39674/cpsc473');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected");
});

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
// View Engine Setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

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
    //res.send("You are on the index");
    res.render('index');
});

// Register page
app.get("/register", function(req, res) {
    res.render("register");
});

// register post
app.post("/register", function(req,res){
  //set request data
    var email = req.body.email,
      username = req.body.username,
      password = req.body.password;

    //create the new user object
      var newuser = new User();
      newuser.email = email;
      newuser.username = username;
      newuser.password = password;
      newuser.save(function(err, savedUser) {
        if(err) {
          console.log(err);
          return res.status(500).send();
        }
        return res.status(200).send();
      });
  });

//login post
app.post("/login", function(req, res) {
  var email = req.body.email,
    username = req.body.username,
    password = req.body.password;
    //query db and return 200 on success
    User.findOne({email: email, username: username, password: password}, function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).send();
      }
      if(!user) {
        return res.status(404).send();
      }
      else {
        return res.status(200).send();
      }
    });
});

    //--commented out for now because I'm unfamiliar with passport, will update later--
    // User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    //     if(err){
    //         console.log(err);
    //         return res.render('register');
    //     }
    //     passport.authenticate("local")(req, res, function(){
    //        res.redirect("/successfull");
    //     });
    // });
