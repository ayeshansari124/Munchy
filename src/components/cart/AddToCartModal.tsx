"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@context/CartContext";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

export default function AddToCartModal({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);


  useEffect(() => {
    if (item.sizes?.length) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]);

  const finalPrice = useMemo(() => {
    let price = item.basePrice;
    if (selectedSize) price += selectedSize.price;
    selectedExtras.forEach((e) => (price += e.price));
    return price;
  }, [item.basePrice, selectedSize, selectedExtras]);

  function toggleExtra(extra: any) {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  }

  function handleAdd() {
    addItem({
      cartId: nanoid(),
      productId: item._id,
      name: item.name,
      image: item.image,
      basePrice: item.basePrice,
      selectedSize,
      selectedExtras,
      quantity: 1,
      finalPrice,
    });

    toast.success("Added to cart");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <div className="flex gap-4">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="rounded-xl object-contain"
          />

          <div>
            <h3 className="text-xl font-bold text-red-600">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>

        {/* SIZES */}
        {item.sizes?.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Choose size</p>
            <div className="space-y-2">
              {item.sizes.map((s: any) => (
                <label
                  key={s.name}
                  className="flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer"
                >
                  <span>{s.name}</span>
                  <input
                    type="radio"
                    checked={selectedSize?.name === s.name}
                    onChange={() => setSelectedSize(s)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* EXTRAS */}
        {item.extras?.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Extras</p>
            <div className="space-y-2">
              {item.extras.map((e: any) => (
                <label
                  key={e.name}
                  className="flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer"
                >
                  <span>
                    {e.name} (+₹{e.price})
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedExtras.some((x) => x.name === e.name)}
                    onChange={() => toggleExtra(e)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-bold">₹{finalPrice}</p>

          <button
            onClick={handleAdd}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
