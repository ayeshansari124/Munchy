"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const { items } = useCart();
  const { user, setUser, loading } = useUser();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-4xl font-extrabold text-red-600">
            MunchY
          </Link>

          <nav className="flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            {/* admin */}
            {user?.role === "admin" && (
              <Link href="/admin" className="text-red-600 font-semibold">
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href={user ? "/profile" : "/login"}
            className="hover:text-red-600"
          >
            {user ? (
              <>
                Hi,{" "}
                <span className="font-semibold">{user.name.split(" ")[0]}</span>
              </>
            ) : (
              "Profile"
            )}
          </Link>

          {/* auth */}
          {!loading &&
            (user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="hover:text-red-600">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-red-600 text-white px-5 py-2 rounded-full"
                >
                  Register
                </Link>
              </>
            ))}

          {/* cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {items.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-red-600 text-white
                  text-xs font-bold
                  w-5 h-5
                  flex items-center justify-center
                  rounded-full
                "
              >
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
