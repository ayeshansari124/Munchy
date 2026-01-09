'use client';

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";


const CartPage = () => {
  const { items, removeItem } = useCart();

  /* ---------------- USER INFO ---------------- */
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(user => {
        if (!user) return;

        setPhone(user.phone || "");
        setStreet(user.address?.street || "");
        setPostalCode(user.address?.postalCode || "");
        setCity(user.address?.city || "");
        setCountry(user.address?.country || "");
      });
  }, []);

  /* ---------------- PRICING ---------------- */
  const subtotal = items.reduce((s, i) => s + i.finalPrice, 0);
  const delivery = items.length ? 5 : 0;
  const total = subtotal + delivery;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

      {/* LEFT – CART ITEMS */}
      <div>
        <h1 className="text-3xl font-bold mb-6 text-red-600">Cart</h1>

        {items.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 mb-4 border-b pb-4">

            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-lg object-contain"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>

              {item.selectedSize && (
                <p className="text-sm text-gray-500">
                  Size: {item.selectedSize.name}
                </p>
              )}

              {item.selectedExtras?.map((e: any) => (
                <p key={e.name} className="text-sm text-gray-500">
                  + {e.name} ₹{e.price}
                </p>
              ))}
            </div>

            <p className="font-bold">₹{item.finalPrice}</p>

           <button onClick={() => removeItem(item.cartId)}>
  <Trash2 className="text-gray-400 hover:text-red-600" />
</button>

          </div>
        ))}

        {/* TOTALS */}
        <div className="mt-6 text-right space-y-1">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{delivery}</p>
          <p className="font-bold text-lg">Total: ₹{total}</p>
        </div>
      </div>

      {/* RIGHT – CHECKOUT */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border"
          placeholder="Phone"
        />

        <input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border"
          placeholder="Street address"
        />

        <div className="flex gap-3 mb-3">
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
            placeholder="Postal code"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
            placeholder="City"
          />
        </div>

        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border"
          placeholder="Country"
        />

        <button className="w-full bg-red-600 text-white py-3 rounded-full font-bold hover:bg-red-700">
          Pay ₹{total}
        </button>
      </div>

    </section>
  );
};

export default CartPage;
