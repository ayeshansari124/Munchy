import { model, models, Schema } from "mongoose";

const extraPriceSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const itemSchema = new Schema(
  {
    image: { type: String, required: true },
    category: { type: String, required: true },

    name: { type: String, required: true },
    description: { type: String, required: true },

    basePrice: { type: Number, required: true },

    sizes: { type: [extraPriceSchema], default: [] },
    extras: { type: [extraPriceSchema], default: [] },
  },
  { timestamps: true }
);

const Item = models.Item || model("Item", itemSchema);
export default Item;
