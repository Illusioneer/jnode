var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("SMTP", {
    host: "localhost", // hostname
    secureConnection: false, // use SSL
    port: 25 // port for secure SMTP
});

//var maildata = {
//    from: "Your Host <root@localhost.com>", // sender address
//    to: "Bryan <bryan.owens@harpercollins.com>", // comma separated list of receivers
//    subject: "Hello", // Subject line
//    text: "Hello world" // plaintext body
//}

exports.send = smtpTransport.sendMail(maildata, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});



