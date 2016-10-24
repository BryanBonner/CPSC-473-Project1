var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

// Points back to User in app.js
var User = mongoose.model('User', UserSchema);
module.exports = User;
