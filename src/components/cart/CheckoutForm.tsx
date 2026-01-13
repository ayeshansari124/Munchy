"use client";

import Input from "@/components/ui/Input";

export default function CheckoutForm({
  address,
  setAddress,
  onPay,
  total,
}: any) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <Input
        label="Phone"
        value={address.phone}
        onChange={(v) => setAddress({ ...address, phone: v })}
      />

      <Input
        label="Street"
        value={address.street}
        onChange={(v) => setAddress({ ...address, street: v })}
      />

      <div className="flex gap-3">
        <Input
          label="City"
          value={address.city}
          onChange={(v) => setAddress({ ...address, city: v })}
        />
        <Input
          label="Postal Code"
          value={address.postalCode}
          onChange={(v) => setAddress({ ...address, postalCode: v })}
        />
      </div>

      <Input
        label="Country"
        value={address.country}
        onChange={(v) => setAddress({ ...address, country: v })}
      />

      <button
        onClick={onPay}
        className="w-full bg-red-600 text-white py-3 rounded-full font-bold hover:bg-red-700 mt-4"
      >
        Pay ₹{total}
      </button>
    </div>
  );
}
