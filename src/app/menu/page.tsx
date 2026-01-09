'use client';
import { useEffect, useState } from "react";
import MenuItem from "@/components/menu/MenuItem";
import AddToCartModal from "@/components/menu/AddToCartModal";

const MenuPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    fetch("/api/menu-items")
      .then(res => res.json())
      .then(setItems);
  }, []);

  const grouped = items.reduce((acc: any, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  function addToCart(order: any) {
    console.log("ADD TO CART:", order);
    setActiveItem(null);
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {Object.entries(grouped).map(([cat, items]: any) => (
          <div key={cat}>
            <h2 className="text-2xl font-bold mb-4">{cat}</h2>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {items.map((item: any) => (
                <div key={item._id} className="min-w-[280px]">
                  <MenuItem
  name={item.name}
  image={item.image}
  description={item.description}
  basePrice={item.basePrice}
/>

                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {activeItem && (
        <AddToCartModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onConfirm={addToCart}
        />
      )}
    </>
  );
};

export default MenuPage;
