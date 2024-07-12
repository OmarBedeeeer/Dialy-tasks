import { Router } from "express";
import { categoryController } from "../controller/category.controller.js";
import { authentecation } from "../../User/auth/auth.user.js";
import { validation } from "../validation/category.validation.js";
import apiFeatures from "../../../middlewares/apiFeatures.js";

const router = Router();

router.post(
  "/create-category",
  authentecation,
  validation.createCategoryvalidation,
  categoryController.createCategory
);
router.get(
  "/",
  authentecation,
  apiFeatures.paginate(),
  apiFeatures.sortCategoriesByName(),
  categoryController.getCategories
);

router.put(
  "/update-category/:categoryId",
  authentecation,
  validation.updateCategoryvalidation,
  categoryController.updateCategory
);
router.delete(
  "/delete-category/:categoryId",
  authentecation,
  validation.deleteCategoryvalidation,
  categoryController.deleteCategory
);

export default router;
