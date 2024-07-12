import Jwt from "jsonwebtoken";
import { ErrorHandler } from "../../../utils/error.handler.js";

export const authentecation = (req, res, next) => {
  let token = req.header("token");
  if (!token) throw new ErrorHandler("UnAuthorized", 401);
  if (!token.startsWith("Bearer "))
    throw new ErrorHandler("Invalid token", 401);
  token = token.split("Bearer ");
  Jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new ErrorHandler(err.message, 498);
    if (decoded.isRefresh) throw new ErrorHandler("Invalid token", 401);
    req.user = decoded;
  });
  next();
};
