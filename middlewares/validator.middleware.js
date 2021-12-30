const validator = require('../helpers/validate.helper')


const input = (req, res, next) =>{

    const validatiionRules = {
        "to" : "required|email",
        "subject" : "string",
        "text" : "required|string|mail",
    }

    validator(req.body, validatiionRules, {}, (error, status)=>{
        if (!status) {
            return res.status(412).json({
                success : false,
                message : 'Validation failed',
                data : error
            })
        }
        next()
    })

}

module.exports = {
    input,
}


// /^7[05678]\d{7}$/