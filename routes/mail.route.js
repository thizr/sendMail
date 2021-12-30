const router = require('express').Router()
const mailCtrl = require('../controllers/mail.controller')
const validate = require('../middlewares/validator.middleware')

router.post('/send',validate.input, mailCtrl.sendMail)

module.exports = router