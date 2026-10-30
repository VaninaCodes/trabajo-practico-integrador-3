import { body } from "express-validator";

// perfil embebido
const profileValidator = (prefix, optional) => {
  const field = (name) => {
    const chain = body(`${prefix}${name}`);
    return optional ? chain.optional() : chain;
  };

  return [
    field("firstName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("El nombre debe tener entre 2 y 50 caracteres")
      .isAlpha("es-ES", { ignore: " " })
      .withMessage("El nombre solo puede tener letras"),
    field("lastName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("El apellido debe tener entre 2 y 50 caracteres")
      .isAlpha("es-ES", { ignore: " " })
      .withMessage("El apellido solo puede tener letras"),
    body(`${prefix}birthDate`)
      .optional()
      .isISO8601()
      .withMessage("La fecha de nacimiento no es válida")
      .custom((value) => {
        if (new Date(value) > new Date()) {
          throw new Error("La fecha de nacimiento no puede ser futura");
        }
        return true;
      }),
    body(`${prefix}phone`)
      .optional()
      .matches(/^\d{8,15}$/)
      .withMessage(
        "El teléfono debe tener solo números (entre 8 y 15 dígitos)",
      ),
  ];
};

export const registerValidator = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres"),
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("El email no tiene formato válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/\d/)
    .withMessage("La contraseña debe tener al menos un número"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
  ...profileValidator("profile.", false),
];

export const loginValidator = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("El email no tiene formato válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const updateProfileValidator = profileValidator("", true);

export const updateUserValidator = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede tener letras y números"),
  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("El email no tiene un formato válido"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
];
