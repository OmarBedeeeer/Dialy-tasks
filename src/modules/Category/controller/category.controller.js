import Category from "../models/category.model.js";
import { catchError, ErrorHandler } from "../../../utils/error.handler.js";

export const categoryController = {
  createCategory: catchError(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      throw new ErrorHandler("Please enter all fields", 400);
    }

    const category = await Category.create({
      name,
      user_id: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: category,
    });
  }),
  getCategories: catchError(async (req, res, next) => {
    const { skip, limit } = req.pagination;
    const sort = req.sort;
    const categories = await Category.find({ user_id: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort(sort);

    res.status(200).json({
      categoriesCount: categories.length,
      categories: categories,
    });
  }),

  updateCategory: catchError(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findById({ _id: categoryId });
    if (category.user_id.toString() !== req.user.id) {
      throw new ErrorHandler("Unauthorized", 401);
    }
    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    category.name = name;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  }),

  deleteCategory: catchError(async (req, res, next) => {
    const { categoryId } = req.params;

    const category = await Category.findById({ _id: categoryId });

    if (category.user_id.toString() !== req.user.id) {
      throw new ErrorHandler("Unauthorized", 401);
    }

    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    await Category.findByIdAndDelete({ _id: categoryId });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }),
};
