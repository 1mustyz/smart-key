const nodemailer = require("nodemailer");
const send = (req,res) =>{
    
    console.log(req.body);

    const output = `
        <p>You have a new contact request</p>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message body: ${req.body.text}</li>

        </ul>
    `;

    async function main() {
        
       // let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'gwendolyn.hintz96@ethereal.email', // generated ethereal user
            pass: 'tKxU88QJ9Wur5TQvgj', // generated ethereal password
          },
          tls:{
              rejectUnauthorized:false
          }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"From NodeMailer" <onemusty.z@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Testing NodeMailer", // Subject line
          text: "Hello world?", // plain text body
          html: output, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.json({"msg":"Your message has been sent"});
      }
      
      main().catch(console.error);
}

module.exports = {
    send
}