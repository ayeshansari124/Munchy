'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { items } = useCart(); 

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

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
          </nav>
        </div>

        {/* RIGHT */}
        {!loading && (
          !user ? (
            <div className="flex items-center gap-4 text-sm font-medium">
              <Link href="/login" className="px-3 py-2 hover:text-red-600">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-red-600 text-white px-5 py-2 rounded-full"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-sm font-medium">

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-red-600 font-semibold"
                >
                  Admin
                </Link>
              )}

              <Link href="/profile">
                Hi, <span className="font-semibold">{user.name.split(" ")[0]}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-full"
              >
                Logout
              </button>

              {/* CART ICON */}
              <Link href="/cart" className="relative">
                <ShoppingCart size={22} />
                {items.length > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    bg-red-600 text-white
                    text-xs font-bold
                    w-5 h-5
                    flex items-center justify-center
                    rounded-full
                  ">
                    {items.length}
                  </span>
                )}
              </Link>

            </div>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
