import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.js";
import { idValidator } from "../middlewares/validator.js";
import { updateUserValidator } from "../middlewares/validations/user.validator.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idValidator,
  validate,
  getUserById,
);

userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idValidator,
  updateUserValidator,
  validate,
  updateUser,
);

userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  idValidator,
  validate,
  deleteUser,
);
