import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true},
        toObject: { virtuals: true},
    }
);

categorySchema.virtual("event", {
    ref: "Event",
    localField: "_id",
    foreignField: "categories"
});

export const CategoryModel = model("Category", categorySchema);