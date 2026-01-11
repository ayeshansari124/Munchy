'use client';

import toast from "react-hot-toast";
import { useState } from "react";
import PageSection from "@/components/layout/PageSection";
import Input from "@/components/ui/Input";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
 const { user, loading, fetchUser } = useUser();
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

  if (loading) {
    return <p className="text-center mt-20">Loading…</p>;
  }

  if (!user) {
    return <p className="text-center mt-20">Please login</p>;
  }

  function startEdit() {
    setForm({
      name: user.name || "",
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

  await fetchUser(); // ✅ re-sync auth state from server
  setEditing(false);
  toast.success("Profile updated");
}



  const fullAddress = [
    user.address?.street,
    user.address?.city,
    user.address?.state,
    user.address?.postalCode,
    user.address?.country,
  ].filter(Boolean).join(", ");

  return (
    <PageSection className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account & delivery details
          </p>
        </div>

        {/* VIEW MODE */}
        {!editing && (
          <div className="space-y-4">
            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow label="Phone" value={user.phone || "—"} />
            <ProfileRow label="Address" value={fullAddress || "—"} />

            <button
              onClick={startEdit}
              className="w-full mt-4 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* EDIT MODE */}
        {editing && (
          <form onSubmit={saveProfile} className="space-y-5">

            <Input
              label="Full Name"
              value={form.name}
              onChange={v =>
  setForm(prev => ({
    ...prev,
    address: {
      ...prev.address,
      street: v,
    },
  }))
}

            />

            <Input
              label="Phone"
              value={form.phone}
              onChange={v => setForm({ ...form, phone: v })}
            />

            {/* ADDRESS */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">
                Delivery Address
              </p>

             <Input
  label="Street"
  value={form.address.street}
  onChange={v =>
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, street: v },
    }))
  }
/>


              <div className="grid grid-cols-2 gap-3">
                <Input
  label="City"
  value={form.address.city}
  onChange={v =>
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, city: v },
    }))
  }
/>


                <Input
  label="State"
  value={form.address.state}
  onChange={v =>
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, state: v },
    }))
  }
/>

              </div>

              <div className="grid grid-cols-2 gap-3">
               <Input
  label="Postal"
  value={form.address.postalCode}
  onChange={v =>
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, postalCode: v },
    }))
  }
/>


                <Input
  label="Country"
  value={form.address.country}
  onChange={v =>
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, country: v },
    }))
  }
/>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700"
              >
                Save Changes
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

/* ---------------- HELPERS ---------------- */

const ProfileRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-900 leading-snug">{value}</p>
  </div>
);
