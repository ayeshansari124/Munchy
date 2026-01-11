'use client';

import toast from "react-hot-toast";
import { useState } from "react";
import PageSection from "@/components/layout/PageSection";
import Input from "@/components/ui/Input";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const { user, loading, setUser } = useUser();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <p className="text-center mt-20">Please login</p>;

  function startEdit() {
    setForm({
      name: user.name,
      phone: user.phone || "",
      address: {
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "",
      },
    });
    setEditing(true);
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (!res.ok) return toast.error("Update failed");

    setUser(await res.json());
    setEditing(false);
    toast.success("Profile updated");
  }

  const addressText = Object.values(user.address || {})
    .filter(Boolean)
    .join(", ");

  return (
    <PageSection className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-5">

        <h1 className="text-2xl font-bold text-center">Your Profile</h1>

        {!editing ? (
          <>
            <Field label="Name" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field label="Phone" value={user.phone || "—"} />
            <Field label="Address" value={addressText || "—"} />

            <button
              onClick={startEdit}
              className="w-full mt-4 bg-red-600 text-white py-3 rounded-full"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={saveProfile} className="space-y-3">
            <Input label="Name" value={form.name}
              onChange={v => setForm({ ...form, name: v })} />

            <Input label="Phone" value={form.phone}
              onChange={v => setForm({ ...form, phone: v })} />

            <Input label="Street" value={form.address.street}
              onChange={v => setForm({ ...form, address: { ...form.address, street: v } })} />

            <div className="grid grid-cols-2 gap-2">
              <Input label="City" value={form.address.city}
                onChange={v => setForm({ ...form, address: { ...form.address, city: v } })} />
              <Input label="State" value={form.address.state}
                onChange={v => setForm({ ...form, address: { ...form.address, state: v } })} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input label="Postal" value={form.address.postalCode}
                onChange={v => setForm({ ...form, address: { ...form.address, postalCode: v } })} />
              <Input label="Country" value={form.address.country}
                onChange={v => setForm({ ...form, address: { ...form.address, country: v } })} />
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-full">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-3 rounded-full border"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </PageSection>
  );
}

const Field = ({ label, value }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
