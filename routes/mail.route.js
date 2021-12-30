const router = require('express').Router()
const mailCtrl = require('../controllers/mail.controller')

router.post('/send', mailCtrl.sendMail)

module.exports = router