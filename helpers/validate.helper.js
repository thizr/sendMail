const Validator =require("validatorjs")

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes(()=>callback(null, true))
    validation.fails(()=>callback(validation.errors, false))
}

Validator.register('mail', (text) => {
    return text.trim() !== ""
    },
    'Le mail ne doit pas être vide')

Validator.register('phone', (phone)=>{
    const phoneRegex = /^7[05678]{1}\d{7}$/
    return phone.match(phoneRegex)
}, "Le numero de téléphone n'a pas le bon format. Ex : 771234567")

Validator.register('cardNumber', (cardNumber)=>{
    const cardNumberRegex = /^[12]{1}\d{3}\d{4}\d{5}$/
    return cardNumber.match(cardNumberRegex)
}, "Le numero de carte d'identité n'est pas correct")

module.exports = validator