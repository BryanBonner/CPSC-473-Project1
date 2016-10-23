var main = function() {
  'use strict';
  var email,
  username,
  password;

  $('#submitRegister').click(function() {
    email = $('#emailReg').val();
    username = $('#userReg').val();
    password = $('#passwdReg').val();
    $.post("http://localhost:3000/register", {
      email: email, username: username, password: password
    }, function(data) {

    })
  });
  $('#submitLogin').click(function() {
    username = $('#user').val();
    password = $('#passw').val();
    $.post("http://localhost:3000/login", {
      email: email, username: username, password: password},
      function(data) {
    })
  });
};
$(document).ready(main);
