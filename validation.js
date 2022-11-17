const joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        username: joi.string().min(6).required(),
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required()
    }); 
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = joi.object({ 
        password: joi.string().min(6).required(),
        username: joi.string().min(6).required() 
    }); 
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
