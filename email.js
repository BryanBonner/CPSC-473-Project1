var express = require('express');
var nodemailer = require('nodemailer');

var app = express();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'unlamented.epicurean@gmail.com',
        pass: 'project_1'
    }
});

app.get('/email', function(req, res) {

    var teacher = req.body.teacher;
    var subject = req.body.subject;
    var email = req.body.email;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Unlamented Epicurean" <atlas_cruz009@csu.fullerton.edu>', // sender address
        to: 'atlascruz009@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world', // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, info) {
        if (error) {
            return console.log(err);
        }
        console.log('Message sent: ', info.response);
    });
});
