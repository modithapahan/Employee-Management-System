const joi = require('@hapi/joi');

const registerValidate = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidate = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    
    return schema(data);
}

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;