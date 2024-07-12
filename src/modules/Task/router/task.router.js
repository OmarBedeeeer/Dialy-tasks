import { Router } from "express";
import { taskController } from "../controller/task.controller.js";
import { validation } from "../validation/task.validation.js";
import { authentecation } from "../../User/auth/auth.user.js";
import apiFeatures from "../../../middlewares/apiFeatures.js";
const router = Router();

router.post(
  "/:categoryId/create-task",
  authentecation,
  validation.createTaskValidation,
  taskController.createTask
);

router.get(
  "/:categoryId/get-tasks",
  apiFeatures.paginate(),
  taskController.getTasks
);

router.put(
  "/:categoryId/update-task/:taskId",
  authentecation,
  validation.updateTaskValidation,
  taskController.updateTask
);

router.delete(
  "/:categoryId/delete-task/:taskId",
  authentecation,
  validation.deleteTaskValidation,
  taskController.deleteTask
);

export default router;
