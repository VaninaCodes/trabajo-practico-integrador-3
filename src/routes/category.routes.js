import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.js";
import { idValidator } from "../middlewares/validator.js";
import { categoryValidator } from "../middlewares/validations/category.validator.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  categoryValidator,
  validate,
  createCategory,
);

categoryRouter.get("/categories", authMiddleware, getAllCategories);

categoryRouter.get(
  "/categories/:id",
  authMiddleware,
  idValidator,
  validate,
  getCategoryById,
);

categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  idValidator,
  categoryValidator,
  validate,
  updateCategory,
);

categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  idValidator,
  validate,
  deleteCategory,
);
