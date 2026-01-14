"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut } from "lucide-react";
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
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">


        <div className="flex items-center justify-between px-4 py-4">

          {/* LOGO */}
          <Link href="/" className="text-3xl font-extrabold text-red-600">
            MunchY
          </Link>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">

  <CartIcon items={items} />

  {/* ================= DESKTOP AUTH ================= */}
  <div className="hidden lg:flex items-center gap-3 text-sm font-medium">

    {user ? (
      <>
        <Link
          href="/profile"
          className="flex items-center gap-1"
        >
          <User size={18} />
          {user.name.split(" ")[0]}
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-full"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link href="/login">Login</Link>
        <Link
          href="/register"
          className="bg-red-600 text-white px-5 py-2 rounded-full"
        >
          Register
        </Link>
      </>
    )}

  </div>

  {/* ================= MOBILE AUTH ICONS ================= */}
  <div className="flex lg:hidden items-center gap-2">

    {/* PROFILE / LOGIN ICON */}
    <Link
      href={user ? "/profile" : "/login"}
      aria-label={user ? "Profile" : "Login"}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <User size={22} />
    </Link>

    {/* LOGOUT or REGISTER ICON */}
    {!loading && (
      user ? (
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="p-2 rounded-full hover:bg-gray-100 text-red-600"
        >
          <LogOut size={22} />
        </button>
      ) : (
        <Link
          href="/register"
          aria-label="Register"
          className="p-2 rounded-full hover:bg-gray-100 text-red-600 font-bold"
        >
          +
        </Link>
      )
    )}

  </div>

</div>

        </div>

       <nav className="grid grid-cols-5 text-sm font-medium text-gray-700 border-t px-4 py-2">
  <Link href="/" className="text-center">Home</Link>
  <Link href="/menu" className="text-center">Menu</Link>
  <Link href="/about" className="text-center">About</Link>
  <Link href="/contact" className="text-center">Contact</Link>
  {user?.role === "admin" && (
    <Link href="/admin" className="text-center text-red-600 font-semibold">
      Admin
    </Link>
  )}
</nav>


      </div>
    </header>
  );
}

/* CART ICON */
function CartIcon({ items }) {
  return (
    <Link href="/cart" className="relative" aria-label="Cart">
      <ShoppingCart size={22} />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {items.length}
        </span>
      )}
    </Link>
  );
}
