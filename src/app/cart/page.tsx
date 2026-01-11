'use client';

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

import CartItemRow from "@/components/cart/CartItemRow";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { useCheckout } from "@/hooks/useCheckout";
import { useRazorpay } from "@/hooks/useRazorpay";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const router = useRouter();

  const { address, setAddress } = useCheckout();
  const { pay } = useRazorpay();

  const subtotal = items.reduce((s, i) => s + i.finalPrice, 0);
  const delivery = items.length ? 5 : 0;
  const total = subtotal + delivery;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

      {/* CART */}
      <div>
        <h1 className="text-3xl font-bold mb-6 text-red-600">Cart</h1>

        {items.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        {items.map(item => (
          <CartItemRow
            key={item.cartId}
            item={item}
            onRemove={removeItem}
          />
        ))}

        <div className="mt-6 text-right space-y-1">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{delivery}</p>
          <p className="font-bold text-lg">Total: ₹{total}</p>
        </div>
      </div>

      {/* CHECKOUT */}
      <CheckoutForm
        address={address}
        setAddress={setAddress}
        total={total}
        onPay={() =>
          pay({
            total,
            items,
            address,
            onSuccess: () => {
              clearCart();
              router.push("/");
            },
          })
        }
      />
    </section>
  );
}
