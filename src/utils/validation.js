import { ErrorHandler } from "../utils/error.handler.js";
export const validator = (req, schema) => {
  const { body, params, query } = req;
  const ValedateObject = {
    ...(req.file && { file: req.file }),
    ...(req.files && { file: req.files }),
  };
  if (Object.values(body).length) ValedateObject.body = body;
  if (Object.values(params).length) ValedateObject.params = params;
  if (Object.values(query).length) ValedateObject.query = query;
  const { error } = schema.validate(ValedateObject, { abortEarly: false });
  if (error) {
    throw new ErrorHandler(
      error.details.map((det) => det.message.split('"').join("")),
      400
    );
  }
};
