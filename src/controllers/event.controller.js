import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
    } = matchedData(req);

    const eventExists = await EventModel.findOne({ title });

    if (eventExists) {
      return res
        .status(400)
        .json({ msg: "Ya existe un evento con ese título" });
    }

    const newEvent = await EventModel.create({
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
      organizer: req.user._id,
    });

    return res.status(201).json({
      msg: "Evento creado correctamente",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email")
      .populate("categories");

    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ organizer: req.user._id }).populate(
      "categories",
    );

    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id)
      .populate("organizer", "username email")
      .populate("categories");

    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const eventExists = await EventModel.findOne({
      title: data.title,
      _id: { $ne: id },
    });

    if (eventExists) {
      return res
        .status(400)
        .json({ msg: "Ya existe un evento con ese título" });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).json({
      msg: "Evento actualizado correctamente",
      data: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await req.event.deleteOne();

    return res.status(200).json({ msg: "Evento eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
