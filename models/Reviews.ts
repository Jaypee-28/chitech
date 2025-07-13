import mongoose, { Schema, Document } from "mongoose";

export interface ReviewDocument extends Document {
  name: string;
  message: string;
  rating: number; // 1–5
  createdAt: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", ReviewSchema);
