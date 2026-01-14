"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";

type Address = {
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

type Props = {
  address: Address;
  setAddress: (a: Address) => void;
  onPay: () => void;
  total: number;
};

export default function CheckoutForm({
  address,
  setAddress,
  onPay,
  total,
}: Props) {
  const isIncomplete =
    !address.phone ||
    !address.street ||
    !address.city ||
    !address.postalCode ||
    !address.country;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold">Checkout</h2>

      <Input
        label="Phone"
        value={address.phone || ""}
        onChange={(v) => setAddress({ ...address, phone: v })}
      />

      <Input
        label="Street"
        value={address.street || ""}
        onChange={(v) => setAddress({ ...address, street: v })}
      />

      <div className="flex gap-3">
        <Input
          label="City"
          value={address.city || ""}
          onChange={(v) => setAddress({ ...address, city: v })}
        />
        <Input
          label="Postal Code"
          value={address.postalCode || ""}
          onChange={(v) =>
            setAddress({ ...address, postalCode: v })
          }
        />
      </div>

      <Input
        label="Country"
        value={address.country || ""}
        onChange={(v) => setAddress({ ...address, country: v })}
      />

      {/* ⚠️ PROFILE WARNING */}
      {isIncomplete && (
        <p className="text-sm text-red-600 font-medium">
          Please{" "}
          <Link
            href="/profile"
            className="underline font-semibold"
          >
            complete your profile
          </Link>{" "}
          to proceed with payment.
        </p>
      )}

      <button
        onClick={onPay}
        disabled={isIncomplete}
        className={`w-full py-3 rounded-full font-bold transition
          ${
            isIncomplete
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }
        `}
      >
        Pay ₹{total}
      </button>
    </div>
  );
}
