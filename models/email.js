var express = require('express');
var nodemailer = require('nodemailer');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'ejs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'unlamented.epicurean@gmail.com',
        pass: 'project_1'
    }
});

app.get('/email', function(req,res){
  res.render('submitPost');
});

app.post('/email', function(req, res) {
    var teacher = req.body.teacher;
    var comment = req.body.comment;
    var email = req.body.email;
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Unlamented Epicurean" <unlamented.epicurean@gmail.com>',
        to: email,
        subject: 'New Excuse Posted',
        text: comment
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, info) {
        if (error) {
            return console.log(err);
        }
        console.log('Message sent: ', info.response);
    });

});
