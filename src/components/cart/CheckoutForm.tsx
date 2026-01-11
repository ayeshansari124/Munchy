'use client';

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

      {["phone", "street", "country"].map((field) => (
        <Input
          key={field}
          label={field.toUpperCase()}
          value={address[field]}
          onChange={(e) =>
            setAddress({ ...address, [field]: e.target.value })
          }
        />
      ))}

      <div className="flex gap-3">
        <Input
          label="Postal Code"
          value={address.postalCode}
          onChange={(e) =>
            setAddress({ ...address, postalCode: e.target.value })
          }
        />
        <Input
          label="City"
          value={address.city}
          onChange={(e) =>
            setAddress({ ...address, city: e.target.value })
          }
        />
      </div>

      <button
        onClick={onPay}
        className="w-full bg-red-600 text-white py-3 rounded-full font-bold hover:bg-red-700 mt-4"
      >
        Pay ₹{total}
      </button>
    </div>
  );
}
