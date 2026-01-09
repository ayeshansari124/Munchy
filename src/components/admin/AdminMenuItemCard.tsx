'use client';

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
};

const AdminMenuItemCard = ({ item, onEdit, onDelete }: Props) => {
  return (
    <div className="relative min-w-[280px] max-w-[280px] bg-white rounded-2xl shadow hover:shadow-lg transition p-4">

      {/* ACTIONS */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => onEdit(item)}   // ✅ THIS WAS MISSING / WRONG
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          title="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(item._id)} // ✅ THIS WAS MISSING / WRONG
          className="p-2 rounded-full bg-white shadow hover:bg-red-50"
          title="Delete"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>

      {/* IMAGE */}
      <div className="w-full h-44 flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.name}
          width={220}
          height={220}
          className="object-contain"
        />
      </div>

      {/* INFO */}
      <h4 className="mt-4 text-lg font-bold text-red-600 text-center">
        {item.name}
      </h4>

      <p className="mt-1 text-sm text-gray-600 text-center line-clamp-2">
        {item.description}
      </p>

      <div className="mt-3 text-center font-semibold">
        ₹{item.basePrice}
      </div>
    </div>
  );
};

export default AdminMenuItemCard;
