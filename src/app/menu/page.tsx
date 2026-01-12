"use client";

import { useEffect, useState } from "react";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const grouped = items.reduce((acc: any, item) => {
    acc[item.category] ||= [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-14">
      {Object.entries(grouped).map(([category, list]: any) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {list.map((item: any) => (
              <div key={item._id} className="min-w-70">
                <MenuItem {...item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
