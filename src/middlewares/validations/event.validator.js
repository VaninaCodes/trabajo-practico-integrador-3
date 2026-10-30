import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "../../models/category.model.js";

export const eventValidator = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres"),
  body("description")
    .trim()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("startDate").isISO8601().withMessage("La fecha de inicio no es válida"),
  body("endDate")
    .isISO8601()
    .withMessage("La fecha de fin no es válida")
    // la fecha de fin debe ser despues de la fecha de inicio
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La fecha de fin debe ser posterior a la de inicio");
      }
      return true;
    }),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero mayor o igual a 1"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado debe ser 'scheduled', 'cancelled' o 'finished'"),
  // location - documento embebido
  body("location.venue")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El lugar debe tener entre 3 y 100 caracteres"),
  body("location.address")
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage("La dirección debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad debe tener entre 2 y 50 caracteres"),
  // categories - opcional
  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser un array")
    .bail()
    // las categorías enviadas deben existir
    .custom(async (ids) => {
      if (!ids.every((id) => isValidObjectId(id))) {
        return true;
      }

      const uniqueIds = [...new Set(ids.map(String))];
      const count = await CategoryModel.countDocuments({
        _id: { $in: uniqueIds },
      });

      if (count !== uniqueIds.length) {
        throw new Error("Alguna de las categorías no existe");
      }
      return true;
    }),
  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un id válido"),
];
