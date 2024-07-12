import Joi from "../../../middlewares/joi.extend.js";
import { validator } from "../../../utils/validation.js";

export const validation = {
  createTaskValidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML().required(),
        private: Joi.boolean(),
      },
      params: {
        categoryId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },
  updateTaskValidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML().required(),
        private: Joi.boolean(),
      },
      params: {
        taskId: Joi.string().required(),
        categoryId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },
  deleteTaskValidation: (req, res, next) => {
    const schema = Joi.object({
      params: {
        taskId: Joi.string().required(),
        categoryId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },
};
