'use client';
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminCapsules from "../../../components/admin/AdminCapsules";
import toast from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCreate() {
    if (!name.trim()) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      toast.success("Category created");
      setName("");
      fetchCategories();
    }
  }

  async function handleUpdate(id: string) {
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });

    if (res.ok) {
      toast.success("Category updated");
      setEditingId(null);
      setName("");
      fetchCategories();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;

    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Category deleted");
    fetchCategories();
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <AdminCapsules />

      {/* CREATE */}
      <div className="mt-10">
        <label className="text-sm text-gray-600 block mb-2">
          New category name
        </label>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-full px-4 py-2 bg-gray-100 focus:outline-none"
          />

          <button
            onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
            className="bg-red-600 text-white px-6 py-2 rounded-full"
          >
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
              }}
              className="px-6 py-2 rounded-full border"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="mt-10">
        <p className="text-sm text-gray-600 mb-4">Existing categories</p>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center justify-between bg-gray-100 rounded-xl px-5 py-3"
            >
              <span className="font-medium">{cat.name}</span>

              <div className="flex gap-2">
  {/* EDIT */}
  <button
    onClick={() => {
      setEditingId(cat._id);
      setName(cat.name);
    }}
    className="p-2 rounded-full bg-white border hover:bg-gray-100 transition"
    title="Edit"
  >
    <Pencil size={16} className="text-gray-700" />
  </button>

  {/* DELETE */}
  <button
    onClick={() => handleDelete(cat._id)}
    className="p-2 rounded-full bg-white border hover:bg-red-50 transition"
    title="Delete"
  >
    <Trash2 size={16} className="text-red-600" />
  </button>
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
