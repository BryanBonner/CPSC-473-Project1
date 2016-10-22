var express = require('express');
var http = require('http');
var path = require('path');
var app = express();



// Create our Express-powered HTTP server
http.createServer(app).listen(3000);
console.log('Running on port 3000');

// set up our routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/login', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/register', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/signUp.html'));
});

app.get('/submitpost', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/submitPost.html'));
});
