const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendMail = (req, res)=>{
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            type : 'oauth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    })
    
    const mailOptions = {
        from: "thiernondiayedeveloper@gmail.com",
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.text,
        attachments: [{   // utf-8 string as an attachment
            filename: 'text1.pdf',
            content: 'hello world!'
        },]
    }

    transporter.sendMail(mailOptions)
    .then((result)=>{
        res.status(200).json({success: true, message : "Mail envoyé avec succes", data : result})
    })
    .catch(err=>{
        res.status(500).json({success: false, message : "Erreur", data : err})
    })
      
}