import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
  name: String,
  quantity: Number,
  basePrice: Number,
  selectedSize: {
    name: String,
    price: Number,
  },
  selectedExtras: [
    {
      name: String,
      price: Number,
    },
  ],
  finalPrice: Number,
});

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [OrderItemSchema],

    total: Number,

    paid: {
      type: Boolean,
      default: false,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    paymentIntentId: String,
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
