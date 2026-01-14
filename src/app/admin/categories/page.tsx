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
  className="
    flex items-center
    bg-gray-100 rounded-xl
    px-3 py-2
    sm:px-4 sm:py-3
  "
>
  {/* CATEGORY NAME */}
  <span className="flex-1 text-base sm:text-sm font-semibold">
    {cat.name}
  </span>

  {/* ACTIONS */}
  <div className="flex items-center gap-1 sm:gap-2">
    <button
      onClick={() => {
        setEditingId(cat._id);
        setName(cat.name);
      }}
      className="p-2"
      aria-label="Edit category"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => remove(cat._id)}
      className="p-2 text-red-600"
      aria-label="Delete category"
    >
      <Trash2 size={18} />
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}
