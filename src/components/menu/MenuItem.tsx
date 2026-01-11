'use client';

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import AddToCartModal from "@/components/cart/AddToCartModal";

type MenuItemType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  basePrice: number;
  sizes?: any[];
  extras?: any[];
};

const FALLBACK_IMAGE = "/pizza.webp";

export default function MenuItem(item: MenuItemType) {
  const [open, setOpen] = useState(false);

  const imageSrc =
    item.image && item.image.startsWith("http")
      ? item.image
      : FALLBACK_IMAGE;

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">

        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          ₹{item.basePrice}
        </div>

        <div className="h-[220px] flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={item.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <h4 className="mt-4 text-lg font-extrabold text-red-600">
          {item.name}
        </h4>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700 transition"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      {open && (
        <AddToCartModal
          item={item}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
