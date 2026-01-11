'use client';

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Order = {
  _id: string;
  user?: { name: string };
  items: any[];
  total: number;
  completed?: boolean;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders", { credentials: "include" })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  async function markDone(id: string) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });

    if (!res.ok) return toast.error("Failed");

    const updated = await res.json();
    setOrders(o => o.map(x => x._id === updated._id ? updated : x));
    toast.success("Order completed");
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {orders.map(order => (
        <div
          key={order._id}
          className={`rounded-xl border p-4 text-sm
            ${order.completed ? "bg-green-50 border-green-400" : "bg-white"}
          `}
        >
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-mono font-semibold">
                #{order._id.slice(-6)}
              </p>
              <p className="text-xs text-gray-500">
                {order.user?.name || "Guest"}
              </p>
            </div>

            {!order.completed && (
              <button
                onClick={() => markDone(order._id)}
                className="text-xs px-3 py-1 rounded-full bg-red-600 text-white"
              >
                Mark Done
              </button>
            )}
          </div>

          <div className="space-y-1 text-xs">
            {order.items.map((i: any, idx: number) => (
              <div key={idx}>
                {i.quantity}× {i.name}
                {i.selectedSize && ` (${i.selectedSize.name})`}
                {i.selectedExtras?.length > 0 && ` +${i.selectedExtras.length}`}
              </div>
            ))}
          </div>

          <div className="mt-3 font-bold text-red-600">
            ₹{order.total}
          </div>
        </div>
      ))}

    </div>
  );
}
