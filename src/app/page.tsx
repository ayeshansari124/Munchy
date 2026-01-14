"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/layout/Hero";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);

 useEffect(() => {
  fetch("/api/menu-items")
    .then((res) => res.json())
    .then((data) => {
      const byCategory: Record<string, any[]> = {};

      // 1️⃣ Group by category
      data.forEach((item: any) => {
        if (!byCategory[item.category]) {
          byCategory[item.category] = [];
        }
        byCategory[item.category].push(item);
      });

      // 2️⃣ Pick latest item from each category
      const latestFromEachCategory = Object.values(byCategory)
        .map((items) =>
          items.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )[0]
        )
        .slice(0, 6); // safety cap

      setItems(latestFromEachCategory);
    });
}, []);


  return (
    <div>
      <Hero />

      <section className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <SectionHeaders subHeader="OUR MENU" mainHeader="Recently Added" />

          {/* MENU GRID */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
