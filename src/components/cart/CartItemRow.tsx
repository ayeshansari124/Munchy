'use client';

import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartItemRow({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b pb-4 mb-4">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-lg object-contain"
      />

      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>

        {item.selectedSize && (
          <p className="text-sm text-gray-500">
            Size: {item.selectedSize.name}
          </p>
        )}

        {item.selectedExtras?.map((e: any) => (
          <p key={e.name} className="text-sm text-gray-500">
            + {e.name} ₹{e.price}
          </p>
        ))}
      </div>

      <p className="font-bold">₹{item.finalPrice}</p>

      <button onClick={() => onRemove(item.cartId)}>
        <Trash2 className="text-gray-400 hover:text-red-600" />
      </button>
    </div>
  );
}
