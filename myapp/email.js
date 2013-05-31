var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "localhost", // hostname
    secureConnection: false, // use SSL
    port: 25 // port for secure SMTP
});

exports.send = function(maildata){
    smtpTransport.sendMail(maildata, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};