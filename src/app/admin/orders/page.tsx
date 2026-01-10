'use client';

import { useEffect, useState } from "react";
import AdminCapsules from "@/components/admin/AdminCapsules";

type Order = {
  _id: string;
  user?: { name: string };
  items: any[];
  total: number;
  paymentStatus: string;
  completed?: boolean;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders", { credentials: "include" })
      .then(res => res.json())
      .then(setOrders);
  }, []);

 async function markCompleted(id: string) {
  const res = await fetch(`/api/admin/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
    credentials: "include",
  });

  if (!res.ok) {
    alert("Failed to mark order completed");
    return;
  }

  const updated = await res.json();

  setOrders(prev =>
    prev.map(o => (o._id === updated._id ? updated : o))
  );
}


  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <AdminCapsules />

      <h1 className="text-2xl font-bold mt-10 mb-6">
        Incoming Orders
      </h1>

      {/* COMPACT GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <div
            key={order._id}
            className={`
              rounded-xl border p-4 text-sm
              ${order.completed
                ? "bg-green-50 border-green-400"
                : "bg-white"}
            `}
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-mono font-semibold">
                  #{order._id.slice(-6)}
                </p>
                <p className="text-gray-500 text-xs">
                  {order.user?.name || "Guest"}
                </p>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                PAID
              </span>
            </div>

            {/* ITEMS (VERY COMPACT) */}
            <div className="space-y-1 mb-3">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="leading-tight">
                  <span className="font-medium">
                    {item.quantity}× {item.name}
                  </span>
                  {item.selectedSize && (
                    <span className="text-gray-500">
                      {" "}({item.selectedSize.name})
                    </span>
                  )}
                  {item.selectedExtras?.length > 0 && (
                    <span className="text-gray-400">
                      {" "}+{item.selectedExtras.length} extra
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold text-red-600">
                ₹{order.total}
              </span>     
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
