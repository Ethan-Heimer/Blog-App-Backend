var nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

function sendEmail(to, subject, html){
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD)
    
    var mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;