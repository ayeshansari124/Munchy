'use client';

import Image from "next/image";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@context/CartContext";
import { nanoid } from "nanoid";


export default function AddToCartModal({
  item,
  onClose,
  onConfirm,
}: any) {
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);

  const {addItem} = useCart();
  const finalPrice = useMemo(() => {
    let price = item.basePrice;

    if (selectedSize) price += selectedSize.price;
    selectedExtras.forEach(e => (price += e.price));

    return price;
  }, [item, selectedSize, selectedExtras]);

  function handleConfirm() {
 addItem({
  cartId: nanoid(),          // ✅ NEW UNIQUE ID
  productId: item._id,       // menu item id
  name: item.name,
  image: item.image,
  basePrice: item.basePrice,
  selectedSize,
  selectedExtras,
  quantity: 1,
  finalPrice,
});

  onClose();
}

  function toggleExtra(extra: any) {
    setSelectedExtras(prev =>
      prev.find(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
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
                <label key={s.name} className="flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer">
                  <span>{s.name}</span>
                  <input
                    type="radio"
                    name="size"
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
                <label key={e.name} className="flex justify-between items-center border rounded-lg px-4 py-2 cursor-pointer">
                  <span>{e.name} (+₹{e.price})</span>
                  <input
                    type="checkbox"
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
  onClick={handleConfirm}
  className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
>
  Add to Cart
</button>

        </div>

      </div>
    </div>
  );
}
