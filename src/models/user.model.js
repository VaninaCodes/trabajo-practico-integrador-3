import { model, Schema, Types } from "mongoose";

// documento embebido 1:1
const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Types.ObjectId,
      ref: "Role",
      required: true,
    },
    profile: profileSchema,
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
  foreignField: "user",
});

export const UserModel = model("User", userSchema);