import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { validation } from "../validation/user.validation.js";
import { authentecation } from "../../User/auth/auth.user.js";

const router = Router();

router.post("/login", validation.signInValidation, userController.login);
router.post("/register", validation.signUpValidation, userController.register);
router.post(
  "/change-password",
  authentecation,
  validation.changingPasswordVali,
  userController.changePassword
);
router.put(
  "/update-user/:userId",
  authentecation,
  validation.updateUserValidation,
  userController.updateUser
);
router.delete(
  "/delete-user/:userId",
  authentecation,
  userController.deleteUser
);

export default router;
