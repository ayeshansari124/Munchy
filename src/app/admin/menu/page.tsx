'use client';

import { useEffect, useState } from "react";
import AdminMenuItemCard from "@/components/admin/AdminMenuItemCard";
import MenuItemForm from "@/components/admin/MenuItemForm";
import toast from "react-hot-toast";

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

  async function fetchItems() {
    const res = await fetch("/api/menu-items");
    setItems(await res.json());
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function deleteItem(id: string) {
    await fetch("/api/menu-items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Item deleted");
    fetchItems();
  }

  const grouped = items.reduce((acc: any, item) => {
    acc[item.category] ||= [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-16">

      <div className="flex justify-center">
        <MenuItemForm
          editingItem={editingItem}
          clearEditing={() => setEditingItem(null)}
          onSave={fetchItems}
        />
      </div>

      {Object.entries(grouped).map(([cat, list]: any) => (
        <div key={cat}>
          <h2 className="text-2xl font-bold mb-4">{cat}</h2>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {list.map((item: any) => (
              <AdminMenuItemCard
                key={item._id}
                item={item}
                onEdit={setEditingItem}
                onDelete={deleteItem}
              />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
