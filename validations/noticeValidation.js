const hapi = require('@hapi/joi');

const noticeValidation = (data) => {
    const schema = hapi.object({
        category: hapi.string().min(6).required(),
        title: hapi.string().min(6).required(),
        description: hapi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports.noticeValidation = noticeValidation;