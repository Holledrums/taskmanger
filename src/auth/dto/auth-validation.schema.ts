import * as Joi from 'joi';

export const authValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(20).required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
});
