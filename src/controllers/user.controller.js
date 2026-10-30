import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null }).populate("events");
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id, deletedAt: null }).populate(
      "events",
    );

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = matchedData(req, { locations: ["body"] });
    const user = await UserModel.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const conditions = [];
    if (data.username) conditions.push({ username: data.username });
    if (data.email) conditions.push({ email: data.email });

    if (conditions.length > 0) {
      const userExists = await UserModel.findOne({
        _id: { $ne: id },
        $or: conditions,
      });

      if (userExists) {
        return res
          .status(400)
          .json({ msg: "El username o el email ya están en uso" });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).json({
      msg: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await UserModel.updateOne({ _id: id }, { deletedAt: new Date() });
    await EventModel.deleteMany({ organizer: id });

    return res.status(200).json({
      msg: "Usuario eliminado correctamente junto con sus eventos",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
