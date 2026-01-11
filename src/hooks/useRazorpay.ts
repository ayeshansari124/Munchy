'use client';

import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PayArgs = {
  total: number;
  items: any[];
  address: any;
  onSuccess: () => void;
};

export function useRazorpay() {
  async function pay({ total, items, address, onSuccess }: PayArgs) {
    if (!items.length) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "MunchY",
        description: "Food Order",
        order_id: order.id,
        handler: async (response: any) => {
          await fetch("/api/orders", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items,
              total,
              address,
              paymentId: response.razorpay_payment_id,
            }),
          });

          toast.success("Order placed successfully 🎉");
          onSuccess();
        },
        theme: { color: "#dc2626" },
      });

      rzp.open();
    } catch {
      toast.error("Payment failed");
    }
  }

  return { pay };
}
