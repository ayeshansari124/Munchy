"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
};

export default function AdminMenuItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <div className="relative w-[260px] bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
      {/* ACTIONS */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="p-2 rounded-full bg-white shadow hover:bg-red-50"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>

      {/* IMAGE */}
      <div className="h-40 flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      {/* INFO */}
      <h4 className="mt-3 text-lg font-bold text-red-600 text-center">
        {item.name}
      </h4>

      <p className="text-sm text-gray-600 text-center line-clamp-2">
        {item.description}
      </p>

      <div className="mt-2 text-center font-semibold">₹{item.basePrice}</div>
    </div>
  );
}
