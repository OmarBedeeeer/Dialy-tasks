import Joi from "../../../middlewares/joi.extend.js";
import { validator } from "../../../utils/validation.js";

export const validation = {
  createCategoryvalidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML().required(),
      },
    });
    validator(req, schema);
    next();
  },

  updateCategoryvalidation: (req, res, next) => {
    const schema = Joi.object({
      body: {
        name: Joi.string().min(3).max(64).escapeHTML(),
      },
      params: {
        categoryId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },

  deleteCategoryvalidation: (req, res, next) => {
    const schema = Joi.object({
      params: {
        categoryId: Joi.string().required(),
      },
    });
    validator(req, schema);
    next();
  },
};
