import { validationResult } from "express-validator";
import { param } from "express-validator";

// validacion reutilizable
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Error de validación",
      errors: errors.array(),
    });
  }
  next();
};

// valida que el :id sea un ObjectId
export const idValidator = [
  param("id").isMongoId().withMessage("El id no es válido"),
];
