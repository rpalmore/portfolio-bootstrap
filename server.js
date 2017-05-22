var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var PORT = process.env.PORT || 3000;
var authorization = require("./password.js");

    // Here we are configuring our SMTP Server details.
    // STMP is mail server which is responsible for sending and recieving email.

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: authorization
});
//------------------SMTP Over-----------------------------//

//------------------Routing Started ----------------------//

app.get('/', function(req, res) {
    res.sendFile('contact.html', { root: __dirname });
});
app.get('/send', function(req, res) {
    var mailOptions = {
        to: "rkpalmore@gmail.com",
        name: req.query.name,
        address: req.query.address,
        subject: "Professional Inquiry",
        text: req.query.text,
        html: "<b>Sender: </b>" + req.query.name + "<br> <b>Email: </b>" + req.query.address + "<p>" + "<hr />" + req.query.text + "</p>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

//--------------------Routing Over----------------------------//

app.listen(PORT, function() {
  console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
});

// Source: https://codeforgeek.com/2014/07/send-e-mail-node-js/

