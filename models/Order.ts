import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ["standard", "express", "pickup"],
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    deliveryEta: {
      type: String, // e.g. "Jul 20 - Jul 21"
    },
    shipping: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String }, // optional for pickup
      state: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["paystack"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "failed", "delivered"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    transactionId: String,
    trackingId: String,
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;
