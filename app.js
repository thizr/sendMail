const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const mailRoute = require('./routes/mail.route')

app.use(bodyParser.urlencoded({urlencoded: false}))
app.use(bodyParser.json())

app.use(cors({
    origin : "*",
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders : 'content-type, Authorization, X-Requested-With, Origin, accept'
}))

app.use('/apiSendMail', mailRoute)

app.use((req, res, next)=>{
    res.send('Send mail api')
    next()
})

module.exports = app