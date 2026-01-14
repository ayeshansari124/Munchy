"use client";

import { useEffect, useState } from "react";
import MenuItemForm from "@/components/menu/MenuItemForm";
import AdminMenuItemCard from "@/components/admin/AdminMenuItemCard";
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
  <div key={cat} className="space-y-4">
    <h2 className="text-2xl font-bold">{cat}</h2>

    {/* ===== DESKTOP GRID ===== */}
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item: any) => (
        <AdminMenuItemCard
          key={item._id}
          item={item}
          onEdit={setEditingItem}
          onDelete={deleteItem}
        />
      ))}
    </div>

    {/* ===== MOBILE CAROUSEL ===== */}
    {/* ===== MOBILE CAROUSEL ===== */}
<div className="md:hidden">
  <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
    {list.map((item: any) => (
      <div
        key={item._id}
        className="min-w-full snap-center flex justify-center px-2"
      >
        <AdminMenuItemCard
          item={item}
          onEdit={setEditingItem}
          onDelete={deleteItem}
        />
      </div>
    ))}
  </div>
</div>

  </div>
))}

    </div>
  );
}
