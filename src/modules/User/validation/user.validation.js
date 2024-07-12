import Joi from "../../../middlewares/joi.extend.js";
import { validator } from "../../../utils/validation.js";

export const validation = {
  signUpValidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML().required(),
        email: Joi.string()
          .email()
          .escapeHTML()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        password: Joi.string().min(8).max(16).escapeHTML().required(),
      },
    });
    validator(req, schema);
    next();
  },

  signInValidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        email: Joi.string()
          .email()
          .escapeHTML()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
          .required(),
        password: Joi.string().escapeHTML().required(),
      },
    });
    validator(req, schema);
    next();
  },

  changingPasswordVali: (req, res, next) => {
    const schema = Joi.object({
      body: {
        oldPassword: Joi.string().min(3).max(12).escapeHTML().required(),
        newPassword: Joi.string().min(3).max(12).escapeHTML().required(),
        confirmPassword: Joi.string().min(3).max(12).escapeHTML().required(),
      },
    });
    validator(req, schema);
    next();
  },

  updateUserValidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML(),
      },
      params: {
        userId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },
};
