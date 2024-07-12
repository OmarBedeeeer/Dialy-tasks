import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { catchError, ErrorHandler } from "../../../utils/error.handler.js";

export const userController = {
  login: catchError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler("Please enter all fields", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorHandler("Invalid credentials", 400);
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  }),

  register: catchError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ErrorHandler("Please enter all fields", 400);
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new ErrorHandler("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  }),

  changePassword: catchError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new ErrorHandler("Please enter all fields", 400);
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new ErrorHandler("Invalid credentials", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }),

  updateUser: catchError(async (req, res, next) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new ErrorHandler("Please enter all fields", 400);
    }

    if (userId !== req.user.id) {
      throw new ErrorHandler("Unauthorized access", 401);
    }
    const user = await User.findOne({
      _id: req.user.id,
    });

    user.name = name;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user,
    });
  }),

  deleteUser: catchError(async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user.id) {
      throw new ErrorHandler("Unauthorized access", 401);
    }
    const user = await User.findByIdAndDelete({ _id: req.user.id });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user: user,
      });
    }
  }),
};
