'use client';

import { useEffect, useState } from "react";
import AdminCapsules from "@components/admin/AdminCapsules";
import AdminMenuItemCard from "@components/admin/AdminMenuItemCard";
import MenuItemForm from "@components/admin/MenuItemForm";
import toast from "react-hot-toast";

const MenuPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

  async function fetchItems() {
    const res = await fetch("/api/menu-items");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this menu item?")) return;

    const res = await fetch("/api/menu-items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success("Item deleted");
      fetchItems();
    }
  }

  // GROUP BY CATEGORY
  const grouped = items.reduce((acc: any, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-16">

      <AdminCapsules />

      {/* FORM */}
      <div className="flex justify-center">
        <MenuItemForm
          onSave={fetchItems}
          editingItem={editingItem}
          clearEditing={() => setEditingItem(null)}
        />
      </div>

      {/* LIST */}
      {Object.entries(grouped).map(([category, categoryItems]: any) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">
            {category}
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {categoryItems.map((item: any) => (
              <AdminMenuItemCard
                key={item._id}
                item={item}
                onEdit={setEditingItem}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}

    </section>
  );
};

export default MenuPage;
