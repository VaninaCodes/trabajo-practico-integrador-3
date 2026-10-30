import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No autenticado" });
    }
    // alerta si el token es invalido
    const decoded = verifyToken(token);

    // solo usuario activos
    const user = await UserModel.findOne({ _id: decoded.id, deletedAt: null });

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

// verifica que el usuario sea admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso solo para admins" });
  }
  next();
};

// verifica que el user sea organizador o admin
export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.param.id);
    // verifica que el evento exista
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }
    const isOwner = event.organizer.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ msg: "Solo el organizador o el admin puede acceder" });
    }
    // guarda el evento
    req.event = event;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
