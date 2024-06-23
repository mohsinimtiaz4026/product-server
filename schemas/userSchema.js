const Joi = require('joi');

module.exports = {
    validateCreateRequest: ({ body }) => {
        const userRegisterSchema = Joi.object({
            username: Joi.string().required(),
            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone: Joi.number().required(),
            profile: Joi.string(),
        });
        return userRegisterSchema.validate(body);
    },
    validateLoginRequest: ({ body }) => {
        const userRegisterSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return userRegisterSchema.validate(body);
    },
    validateUserUpdateRequest: ({ body }) => {
        const userUpdateSchema = Joi.object({
            id: Joi.string().required(),
            username: Joi.string().required(),
            fullname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone: Joi.number().required(),
            profile: Joi.string(),
        });
        return userUpdateSchema.validate(body);
    },
    validateUserDeleteRequest: ({ body }) => {
        const userDeleteSchema = Joi.object({
            id: Joi.string().required(),
        });
        return userDeleteSchema.validate(body);
    }
};