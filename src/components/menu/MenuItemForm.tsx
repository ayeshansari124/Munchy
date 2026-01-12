'use client';

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SizesEditor from "@/components/menu/SizesEditor";
import ExtrasEditor from "@/components/menu/ExtrasEditor";
import Accordion from "@components/ui/Accordion";
import Input from "@components/ui/Input";
import Textarea from "../ui/TextArea";

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

  //fetch
  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  //edit
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

  //accordion when editing
  useEffect(() => {
    if (!editingItem) return;

    setShowSizes((editingItem.sizes?.length ?? 0) > 0);
    setShowExtras((editingItem.extras?.length ?? 0) > 0);
  }, [editingItem]);

  //image
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  //save item
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
