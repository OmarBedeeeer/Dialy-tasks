import express from "express";
import dotenv from "dotenv";
import connectToDb from "./database/connection.js";
import userRouter from "./src/modules/User/router/user.router.js";
import categoryRouter from "./src/modules/Category/router/category.router.js";
import taskRouter from "./src/modules/Task/router/task.router.js";
import { ErrorHandler } from "./src/utils/error.handler.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/task", taskRouter);
connectToDb();
app.all("*", (req, res, next) => {
  throw new ErrorHandler("Route not found", 404);
});
app.use((err, req, res, next) => {
  const { message, status, stack } = err;
  res.status(status || 500).json({
    message,
    ...(process.env.MODE === "development" && { stack }),
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port!`);
});
