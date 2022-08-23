const hapi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = hapi.object({
        name: hapi.string().min(6).required(),
        email: hapi.string().min(6).required().email(),
        password: hapi.string().min(6).required()    
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = hapi.object({
        email: hapi.string().min(6).required().email(),
        password: hapi.string().min(6).required()  
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;