const nodemailer = require('nodemailer')
require('dotenv').config()
const fs = require('fs')

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
    const filenames = []
    const attachments = (req.files).map((file)=>{
        filenames.push(file.filename)
        return {path : `${req.protocol}://${req.get('host')}/files/${file.filename}`}
    })
    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.text,
        attachments: attachments
    }

    transporter.sendMail(mailOptions)
    .then((result)=>{
        filenames.forEach(file => {
            fs.unlinkSync(`files/${file}`, (error)=>{
                if (error) throw error
            })
        });
        
        res.status(200).json({success: true, message : "Mail envoyé avec succes", data : result})
    })
    .catch(error=>{
        res.status(500).json({success: false, message : "Erreur", data : error})
    })
      
}