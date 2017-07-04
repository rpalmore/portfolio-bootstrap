var express = require("express");
var PORT = process.env.PORT || 3000;
var nodemailer = require("nodemailer");
var app = express();
var bodyParser = require("body-parser");
var path = require("path")
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));


var authorization = require("./password.js");
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: authorization
});
//------------------SMTP Over-----------------------------//

//------------------Routing Started ----------------------//

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/portfolio', function(req, res) {
    res.sendFile('portfolio.html', { root: __dirname + "/public" });
});

app.get('/contact', function(req, res) {
    res.sendFile('contact.html', { root: __dirname + "/public"});
});

app.post("/sendemail", function(req, res) {
    var mailOptions = {
        to: "rkpalmore@gmail.com",
        subject: "Hey! Saw Your Profile",
        text: req.body.text,
        html: "<b>Sender: </b>" + req.body.from + "<br> <b>Email: </b>" + req.body.address + "<p>" + "<hr />" + req.body.text + "</p>"
    }
    console.log("Message: " + mailOptions.text);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message successfully sent from: " + req.body.address);
            res.send("banana");
        }
    });
});

//--------------------Routing Over----------------------------//

app.listen(PORT, function() {
  console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
});

// Source: https://codeforgeek.com/2014/07/send-e-mail-node-js/

