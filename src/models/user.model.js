import { model, Schema, Types } from "mongoose";

// documento embebido 1:1
const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlenght: 2,
      maxlenght: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlenght: 2,
      maxlenght: 50,
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlenght: 3,
      maxlenght: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El email no tiene un formato válido"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      type: profileSchema,
      required: true,
    },
    deleteAt:{
      type: Date,
      default: null,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
  },
);

userSchema.virtual("events", {
  ref: "Events",
  localField: "_id",
  foreignField: "organizer",
});

export const UserModel = model("User", userSchema);