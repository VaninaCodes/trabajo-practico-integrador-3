import { model, Schema } from "mongoose";

// location - embebido 1:1
const locationSchema = new Schema(
  {
    venue: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  { _id: false },
);
// event
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "La capacidad debe ser un número entero",
      },
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
    location: {
      type: locationSchema,
      required: true,
    },
    // organizer(ObjectId) -  ref User 1:1
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // categories(array ObjectIds) - ref Category N:M
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const EventModel = model("Event", eventSchema);
