import mongoose, { Schema, models } from "mongoose";

const extraPriceSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderItemSchema = new Schema({
  name: String,
  quantity: Number,
  basePrice: Number,
  selectedSize: { type: [extraPriceSchema], default: [] },
  selectedExtras: { type: [extraPriceSchema], default: [] },
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
