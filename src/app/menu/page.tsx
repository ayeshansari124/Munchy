"use client";

import { useEffect, useState, useRef } from "react";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<Record<string, number>>({});
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  function handleScroll(category: string) {
    const el = scrollRefs.current[category];
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex((prev) => ({ ...prev, [category]: index }));
  }

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-14">
      <SectionHeaders
        subHeader="Checkout our Menu"
        mainHeader="Delicious Items"
      />

      {Object.entries(grouped).map(([category, list]: any) => (
        <div key={category} className="space-y-4">
          <h2 className="text-3xl font-bold">{category}</h2>

          {/* ===== DESKTOP GRID ===== */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((item: any) => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>

          {/* ===== MOBILE CAROUSEL ===== */}
          <div className="md:hidden space-y-3">
            <div
              ref={(el) => (scrollRefs.current[category] = el)}
              onScroll={() => handleScroll(category)}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
              {list.map((item: any) => (
                <div
                  key={item._id}
                  className="min-w-full snap-center flex justify-center px-2"
                >
                  <MenuItem {...item} />
                </div>
              ))}
            </div>

            {/* ===== SWIPE INDICATORS ===== */}
            <div className="flex justify-center gap-2">
              {list.map((_: any, i: number) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition ${
                    activeIndex[category] === i
                      ? "bg-red-600 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
