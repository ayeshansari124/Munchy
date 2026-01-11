'use client';

import Image from "next/image";
import { useUser } from "@/hooks/useUser";

export default function Hero() {
  const { user } = useUser();

  return (
    <section className="relative bg-white overflow-hidden">

      {/* DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/salad.webp"
          alt=""
          width={520}
          height={520}
          className="absolute top-[-150px] left-1/4 opacity-95"
          priority
        />
        <Image
          src="/fries.avif"
          alt=""
          width={560}
          height={560}
          className="absolute bottom-[-120px] opacity-95"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <div className="mb-4">
              {user ? (
                <>
                  <p className="text-sm font-bold text-gray-700">
                    Hi,{" "}
                    <span className="text-red-600 text-3xl italic">
                      {user.name}
                    </span>{" "}
                    👋
                  </p>
                  <p className="text-lg font-bold text-gray-500 mt-1">
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
              Pizza is the missing piece that makes every day complete.
            </p>

            <div className="mt-8 flex gap-6">
              <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700">
                Order Now
              </button>
              <button className="text-gray-700 hover:text-red-600">
                Learn more →
              </button>
            </div>
          </div>

          <div className="relative h-[420px]">
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
}
