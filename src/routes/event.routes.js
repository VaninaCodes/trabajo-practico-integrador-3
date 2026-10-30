import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import {
  authMiddleware,
  ownerOrAdminMiddleware,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.js";
import { idValidator } from "../middlewares/validator.js";
import { eventValidator } from "../middlewares/validations/event.validator.js";

export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  eventValidator,
  validate,
  createEvent,
);

eventRouter.get("/events", authMiddleware, getAllEvents);

eventRouter.get("/events/my", authMiddleware, getMyEvents);

eventRouter.get(
  "/events/:id",
  authMiddleware,
  idValidator,
  validate,
  getEventById,
);

eventRouter.put(
  "/events/:id",
  authMiddleware,
  idValidator,
  eventValidator,
  validate,
  ownerOrAdminMiddleware,
  updateEvent,
);

eventRouter.delete(
  "/events/:id",
  authMiddleware,
  idValidator,
  validate,
  ownerOrAdminMiddleware,
  deleteEvent,
);
