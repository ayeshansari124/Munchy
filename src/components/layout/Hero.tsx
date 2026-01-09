'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <section className="relative bg-white overflow-hidden">
      
      {/* DECORATION LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/salad.webp"
          alt="Salad decor"
          width={520}
          height={520}
          className="absolute top-[-150px] left-1/4 opacity-95"
          priority
        />

        <Image
          src="/fries.avif"
          alt="Fries decor"
          width={560}
          height={560}
          className="absolute bottom-[-120px] opacity-95"
          priority
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div>

            {/* PERSONAL GREETING (FIXED) */}
            {/* PERSONAL GREETING */}
<div className="mb-4">
  {user ? (
    <>
      <p className="text-sm md:text-base font-bold text-gray-700">
        Hi,{" "}
        <span className="text-red-600 font-bold text-3xl italic">
          {user.name}
        </span>{" "}
        👋
      </p>
      <p className="text-lg md:text-xl font-bold text-gray-500 mt-1">
        Feeling hungry? We’ve got you covered 🍕
      </p>
    </>
  ) : (
    <p className="text-sm text-gray-500">
      Feeling hungry? We’ve got you covered 🍕
    </p>
  )}
</div>


            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Everything <br />
              is better <br />
              with a <span className="text-red-600">Pizza</span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-md font-bold">
              Pizza is the missing piece that makes every day complete,
              a simple yet delicious joy in life.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <button className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition">
                Order Now
              </button>

              <button className="text-gray-700 font-medium hover:text-red-600 transition">
                Learn more →
              </button>
            </div>
          </div>

          {/* RIGHT PIZZA */}
          <div className="relative w-full h-[420px]">
            <Image
              src="/pizza.webp"
              alt="Pizza"
              fill
              className="object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
