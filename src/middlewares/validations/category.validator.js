import { body } from "express-validator";

export const categoryValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripción puede tener hasta 200 caracteres"),
];
