const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.post("/send-mail", (req, res) => {
    //logika do wysylania maila
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lukaszholderny@gmail.com",
            pass: "sfprvzddjmqdhcit"
       },
       tls: {
        rejectUnauthorized: false,
       },
    })

    let mailOptions = {
        from: "lukaszholderny@gmail.com",
        to: req.body.email,
        subject: "test",
        text: "DOBRY WIECZOR",
    }

    transporter.sendMail(mailOptions, function(err, succes){
        if(err) {
            console.log(err)
        } else {
            console.log("Email wyslany!")
        }
    })
    res.set('Content-Type', 'text/html')
    res.send(`
<html>
  <head>
    <style>
    #result {

      color:white;
      text-align:center;
      font-size:2em;
      margin-top:20%;
      
    }
    body {
        background-color:black;
    }
    </style>
  </head>
  <body>
    <p id='result'>Informacja wyslana na: ${req.body.email}</p>
    
  </body>
</html>
`)


 
});

app.listen(process.env.PORT || 80, err => {
    if(err) throw err;
    console.log("Server is up");
});