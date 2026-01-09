'use client';

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import SizesEditor from "@components/admin/SizesEditor";
import ExtrasEditor from "@components/admin/ExtrasEditor";
import toast from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
};

type MenuItemFormProps = {
  onSave: () => void;
  editingItem?: any;
  clearEditing: () => void;
};

const MenuItemForm = ({
  onSave,
  editingItem,
  clearEditing,
}: MenuItemFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const [sizes, setSizes] = useState<any[]>([]);
  const [extras, setExtras] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showSizes, setShowSizes] = useState(false);
  const [showExtras, setShowExtras] = useState(false);

  /* ---------------- Fetch categories ---------------- */
  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  /* ---------------- Autofill on edit ---------------- */
  useEffect(() => {
    if (!editingItem) return;

    setName(editingItem.name || "");
    setDescription(editingItem.description || "");
    setCategory(editingItem.category || "");
    setBasePrice(editingItem.basePrice?.toString() || "");
    setSizes(editingItem.sizes || []);
    setExtras(editingItem.extras || []);
    setImagePreview(editingItem.image || null);
  }, [editingItem]);

  /* -------- Auto open accordions when editing -------- */
  useEffect(() => {
    if (!editingItem) return;

    setShowSizes((editingItem.sizes?.length ?? 0) > 0);
    setShowExtras((editingItem.extras?.length ?? 0) > 0);
  }, [editingItem]);

  /* ---------------- Image handling ---------------- */
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  /* ---------------- Save item ---------------- */
  async function handleSave() {
    if (!name || !category || !basePrice) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl = imagePreview;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        toast.error("Image upload failed");
        return;
      }

      imageUrl = (await uploadRes.json()).url;
    }

    const res = await fetch("/api/menu-items", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingItem?._id,
        name,
        description,
        category,
        basePrice: Number(basePrice),
        sizes,
        extras,
        image: imageUrl,
      }),
    });

    if (!res.ok) {
      toast.error("Operation failed");
      return;
    }

    toast.success(editingItem ? "Item updated" : "Item created");
    clearEditing();
    onSave();

    setName("");
    setDescription("");
    setCategory("");
    setBasePrice("");
    setSizes([]);
    setExtras([]);
    setImageFile(null);
    setImagePreview(null);
    setShowSizes(false);
    setShowExtras(false);
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 space-y-8">

      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Menu Item" : "Create Menu Item"}
      </h3>

      {/* IMAGE + FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* IMAGE */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl border bg-gray-50 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-contain" />
            ) : (
              <span className="text-gray-400 text-sm">No image</span>
            )}
          </div>

          <label className="block cursor-pointer">
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <div className="bg-red-600 text-white text-center py-2 rounded-full font-medium hover:bg-red-700">
              Choose Image
            </div>
          </label>

          {imageFile && (
            <p className="text-xs text-center text-gray-500 truncate">
              {imageFile.name}
            </p>
          )}
        </div>

        {/* FIELDS */}
        <div className="md:col-span-2 space-y-5">
          <Input label="Item name" value={name} onChange={setName} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 text-sm"
              >
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <Input
              label="Base price"
              type="number"
              value={basePrice}
              onChange={setBasePrice}
            />
          </div>

          <Textarea label="Description" value={description} onChange={setDescription} />
        </div>
      </div>

      {/* SIZES + EXTRAS SIDE BY SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SIZES */}
        <Accordion
          title={`Sizes (${sizes.length})`}
          open={showSizes}
          toggle={() => setShowSizes(v => !v)}
        >
          <SizesEditor items={sizes} setItems={setSizes} />
        </Accordion>

        {/* EXTRAS */}
        <Accordion
          title={`Extra Ingredients (${extras.length})`}
          open={showExtras}
          toggle={() => setShowExtras(v => !v)}
        >
          <ExtrasEditor items={extras} setItems={setExtras} />
        </Accordion>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700"
        >
          {editingItem ? "Update Item" : "Create Item"}
        </button>

        {editingItem && (
          <button
            onClick={clearEditing}
            className="px-6 py-3 rounded-full border"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemForm;

/* ---------------- UI helpers ---------------- */

const Accordion = ({ title, open, toggle, children }: any) => (
  <div className="border rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={toggle}
      className="w-full flex justify-between items-center px-5 py-3 font-semibold bg-gray-50"
    >
      <span>{title}</span>
      <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
    </button>

    <div
      className={`grid transition-all duration-300 ${
        open ? "grid-rows-[1fr] p-5" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  </div>
);

const Input = ({ label, value, onChange, type = "text" }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-2.5 text-sm"
    />
  </div>
);

const Textarea = ({ label, value, onChange }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-3 text-sm resize-none"
    />
  </div>
);
