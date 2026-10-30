import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = matchedData(req);

    const categoryExists = await CategoryModel.findOne({ name });

    if (categoryExists) {
      return res
        .status(400)
        .json({ msg: "Ya existe una categoría con ese nombre" });
    }

    const newCategory = await CategoryModel.create({ name, description });

    return res.status(201).json({
      msg: "Categoría creada correctamente",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // virtual populate events
    const category = await CategoryModel.findById(id).populate("events");

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = matchedData(req);

    // verifica que la categoría exista
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    // verifica que el nombre no se repita
    const categoryExists = await CategoryModel.findOne({
      name,
      _id: { $ne: id },
    });

    if (categoryExists) {
      return res
        .status(400)
        .json({ msg: "Ya existe una categoría con ese nombre" });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json({
      msg: "Categoría actualizada correctamente",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // verifica que la categoría exista
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    // eliminación en cascada
    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );

    await CategoryModel.deleteOne({ _id: id });

    return res.status(200).json({
      msg: "Categoría eliminada correctamente y quitada de los eventos",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
