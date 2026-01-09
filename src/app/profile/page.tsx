'use client';

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setName(data?.name || "");
        setPhone(data?.phone || "");
        setAddress({
          street: data?.address?.street || "",
          city: data?.address?.city || "",
          state: data?.address?.state || "",
          postalCode: data?.address?.postalCode || "",
          country: data?.address?.country || "",
        });
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        phone,
        address,
      }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <p className="text-center mt-20">Please login.</p>;

  const formattedAddress = Object.values(address)
    .filter(Boolean)
    .join(", ");

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Your Profile</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your account & delivery details
          </p>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="space-y-4">
            <ProfileField label="Full Name" value={name} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Phone" value={phone || "—"} />
            <ProfileField
              label="Address"
              value={formattedAddress || "—"}
            />

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form onSubmit={handleSave} className="space-y-4">

            <Input label="Full Name" value={name} onChange={setName} />
            <ReadOnly label="Email" value={user.email} />
            <Input label="Phone Number" value={phone} onChange={setPhone} />

            {/* ADDRESS */}
            <div className="space-y-4">
              <Input
                label="Street"
                value={address.street}
                onChange={(v) => setAddress({ ...address, street: v })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={address.city}
                  onChange={(v) => setAddress({ ...address, city: v })}
                />
                <Input
                  label="State"
                  value={address.state}
                  onChange={(v) => setAddress({ ...address, state: v })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Postal Code"
                  value={address.postalCode}
                  onChange={(v) =>
                    setAddress({ ...address, postalCode: v })
                  }
                />
                <Input
                  label="Country"
                  value={address.country}
                  onChange={(v) =>
                    setAddress({ ...address, country: v })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;

/* ---------------- HELPER COMPONENTS ---------------- */

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-red-500"
    />
  </div>
);

const ReadOnly = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      value={value}
      disabled
      className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
    />
  </div>
);
