import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = matchedData(req);

    // verifica que el username y el email sean únicos
    const userExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "El username o el email ya están registrados" });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password: await hashPassword(password),
      role,
      profile,
    });

    // no devuelve el password en la respuesta
    newUser.password = undefined;

    return res.status(201).json({
      msg: "Usuario registrado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // solo usuarios activos
    const user = await UserModel.findOne({ email, deletedAt: null }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ msg: "Login exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    return res.status(200).json({ data: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const updates = {};
    for (const key in data) {
      updates[`profile.${key}`] = data[key];
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json({
      msg: "Perfil actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ msg: "Sesión cerrada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
