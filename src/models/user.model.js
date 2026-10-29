import { model, Schema, Types } from "mongoose";

// documento embebido 1:1
const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
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
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Types.ObjectId,
      ref: "Role",
      require: true,
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