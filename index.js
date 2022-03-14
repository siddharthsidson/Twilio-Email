// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// temp
const accountSid = 'ACdf00f97c48097253d6344b7a1f6500c2';
const authToken = 'd499c812e3e2766d6d26cea3ab893514';
const client = require('twilio')(accountSid, authToken);
const data=client.messages.list({limit: 1,
    to:'whatsapp:+14155238886'}
    )  
    .then(messages=>{ return messages});
    const details = [{"Id":"1","Name":"Aravind","Contact-No":"whatsapp:+917012375304","Property-Manager":"Ajith","Property-Manager-Email":"ajithmhn45@gmail.com"},
    {"Id":"2","Name":"Nelson","Contact-No":"whatsapp:+917034017573","Property-Manager":"Siddharth","Property-Manager-Email":"siddharthsidson@gmail.com"},
    {"Id":"3","Name":"Ajith","Contact-No":"whatsapp:+919562164471","Property-Manager":"Siddharth","Property-Manager-Email":"siddharthsidson@gmail.com"}]

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});


// // Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

     let message = req.body.Body;
     let senderID = req.body.From;

    
      console.log(senderID);
      console.log(message);

    var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: 'codetestjazz@outlook.com',
            pass: 'jazz@12345'
        }
        });
        var sendtoemail;
        var pOwner;
        var Oid;
        for(let i=0;i<details.length;i++){
            if(senderID == details[i]['Contact-No']){
                pOwner = details[i]['Name']
                sendtoemail = details[i]['Property-Manager-Email']
                Oid = details[i]['Id']
            }
        }

        var mailOptions = {
        from: 'codetestjazz@outlook.com',
        to: sendtoemail,
        subject: 'Crockers New Message from '+Oid,
        html: `<table border='1'>
        <tr>
          <th>Message From</th>
          <th>Name</th>
          <th>Message Content</th>
          <th>Message Medium</th>
        </tr>
        <tr>
          <td>${senderID}</td>
          <td><b>${pOwner}</b></td>
          <td>${message}</td>
          <td>Whatsapp</td>
        </tr>
      </table>`
    };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});