"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/hooks/useCheckout";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useUser } from "@/hooks/useUser";

import CartItemRow from "@/components/cart/CartItemRow";
import CheckoutForm from "@/components/cart/CheckoutForm";

export default function CartPage() {
  const router = useRouter();

  const { items, removeItem, clearCart } = useCart();
  const { address, setAddress } = useCheckout();
  const { pay } = useRazorpay();
  const { user } = useUser();

  const subtotal = items.reduce((sum, item) => sum + item.finalPrice, 0);
  const delivery = items.length ? 35 : 0;
  const total = subtotal + delivery;

  useEffect(() => {
    if (!user) return;

    setAddress(prev => ({
      ...prev,
      phone: user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      postalCode: user.address?.postalCode || "",
      country: user.address?.country || "",
    }));
  }, [user, setAddress]);


  if (!items.length) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Your Cart
        </h1>
        <p className="text-gray-500">
          Your cart is empty. Add some delicious items 🍕
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      
      <div>
        <h1 className="text-3xl font-bold mb-6 text-red-600">
          Cart
        </h1>

        <div className="space-y-4">
          {items.map(item => (
            <CartItemRow
              key={item.cartId}
              item={item}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="mt-6 text-right space-y-1">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{delivery}</p>
          <p className="font-bold text-lg">Total: ₹{total}</p>
        </div>
      </div>

      <CheckoutForm
        address={address}
        setAddress={setAddress}
        total={total}
        onPay={() => {
          if (!user) {
            router.push("/login");
            return;
          }

          pay({
            total,
            items,
            address,
            onSuccess: () => {
              clearCart();
              router.push("/");
            },
          });
        }}
      />
    </section>
  );
}
