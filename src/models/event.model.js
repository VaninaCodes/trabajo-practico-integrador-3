import { model, Schema, Types } from "mongoose";

// location - embebido 1:1
const locationSchema = new Schema(
  {
    venue: {
      type: String,
      require: true,
    },
    adress: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  { _id: false },
);
// event
const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    capacity: {
      type: Number,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
    location: locationSchema,
    // organizer(ObjectId) -  ref User 1:1
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
