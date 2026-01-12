"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function save() {
    if (!name.trim()) return toast.error("Name required");

    const method = editingId ? "PUT" : "POST";

    await fetch("/api/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, name }),
    });

    toast.success(editingId ? "Updated" : "Created");
    setName("");
    setEditingId(null);
    fetchCategories();
  }

  async function remove(id: string) {
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Deleted");
    fetchCategories();
  }

  return (
    <div className="max-w-xl mx-auto space-y-10">
      {/* CREATE / EDIT */}
      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-full px-4 py-2 border"
          placeholder="Category name"
        />

        <button
          onClick={save}
          className="bg-red-600 text-white px-6 rounded-full"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-3"
          >
            <span className="font-medium">{cat.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(cat._id);
                  setName(cat.name);
                }}
              >
                <Pencil size={16} />
              </button>

              <button onClick={() => remove(cat._id)}>
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
