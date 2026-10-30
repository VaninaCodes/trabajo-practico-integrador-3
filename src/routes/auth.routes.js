import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.js";
import {
  loginValidator,
  registerValidator,
  updateProfileValidator,
} from "../middlewares/validations/user.validator.js";
export const authRouter = Router();

authRouter.post("/auth/register", registerValidator, validate, register);
authRouter.post("/auth/login", loginValidator, validate, login);
authRouter.get("/auth/profile", authMiddleware, getProfile);
authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidator,
  validate,
  updateProfile,
);
authRouter.post("/auth/logout", authMiddleware, logout);
