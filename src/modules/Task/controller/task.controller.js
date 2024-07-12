import Task from "../models/task.model.js";
import Category from "../../Category/models/category.model.js";
import { catchError, ErrorHandler } from "../../../utils/error.handler.js";
import Jwt from "jsonwebtoken";
export const taskController = {
  createTask: catchError(async (req, res, next) => {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    if (category.user_id.toString() !== req.user.id) {
      throw new ErrorHandler("Unauthorized", 401);
    }

    const task = await Task.create({
      name,
      category_id: categoryId,
      user_id: req.user.id,
      private: req.body.private || false,
    });

    if (!task) {
      throw new ErrorHandler("Filled all fields", 400);
    }

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      task: task,
    });
  }),

  getTasks: catchError(async (req, res, next) => {
    const { categoryId } = req.params;
    let token = req.header("token");
    let isAuthUserCategory = false;
    if (token) {
      token = token.split("Bearer ");
      const payload = Jwt.verify(token[1], process.env.JWT_SECRET);
      const category = await Category.findById({ _id: categoryId });
      if (category.user_id.toString() === payload.id) {
        isAuthUserCategory = true;
      }
    }
    const query = { category_id: categoryId };
    if (!isAuthUserCategory) {
      query.private = false;
    }
    let { sort } = req.query;
    let order;
    if (sort === "public") {
      order = 1;
    } else if (sort === "private") {
      order = -1;
    } else {
      order = 0;
    }
    const tasks = await Task.find(query)
      .skip(req.pagination.skip)
      .limit(req.pagination.limit)
      .sort({ private: order });

    res.status(200).json({
      tasksCount: tasks.length,
      message: "Tasks fetched successfully",
      tasks: tasks,
    });
  }),

  updateTask: catchError(async (req, res, next) => {
    const { name, private: isPrivate } = req.body;
    const { taskId, categoryId } = req.params;

    const task = await Task.findById({ _id: taskId });
    if (!task) {
      throw new ErrorHandler("Task not found", 404);
    }
    if (task.user_id.toString() !== req.user.id) {
      throw new ErrorHandler("Unauthorized to Update", 401);
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, category_id: categoryId },
      { name, private: isPrivate },
      { new: true }
    );

    if (!updatedTask) {
      throw new ErrorHandler("Task not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  }),

  deleteTask: catchError(async (req, res, next) => {
    const { taskId, categoryId } = req.params;
    const task = await Task.findById({ _id: taskId });
    if (!task) {
      throw new ErrorHandler("Task not found", 404);
    }

    if (task.user_id.toString() !== req.user.id) {
      throw new ErrorHandler("Unauthorized to Delete", 401);
    }

    await Task.findByIdAndDelete({ _id: taskId });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  }),
};
