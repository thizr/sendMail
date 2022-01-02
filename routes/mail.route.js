const router = require('express').Router()
const multer = require('../middlewares/multer.muddleware')
const mailCtrl = require('../controllers/mail.controller')
const validate = require('../middlewares/validator.middleware')

router.post('/send',validate.input, multer, mailCtrl.sendMail)

module.exports = router