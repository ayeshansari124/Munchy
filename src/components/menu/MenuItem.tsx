"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import AddToCartModal from "@/components/cart/AddToCartModal";

const FALLBACK_IMAGE = "/fallback.png";

export default function MenuItem(item) {
  const [open, setOpen] = useState(false);

  const imageSrc =
    item.image && item.image.startsWith("http")
      ? item.image
      : FALLBACK_IMAGE;

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

        {/* PRICE BADGE */}
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          ₹{item.basePrice}
        </div>

        {/* IMAGE AREA (FIXED & SAFE) */}
        <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 90vw, 300px"
            className="object-contain p-4"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col gap-3 text-center">
          <h4 className="text-2xl font-extrabold text-red-600 leading-snug line-clamp-2">
            {item.name}
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {item.description}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700 transition"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {open && <AddToCartModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
