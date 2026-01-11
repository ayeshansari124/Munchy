'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const CAPSULES = [
  { label: "Categories", href: "/admin/categories" },
  { label: "Menu", href: "/admin/menu" },
  { label: "Orders", href: "/admin/orders" },
];

export default function AdminCapsules() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {CAPSULES.map(({ label, href }) => {
        const active = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`
              px-5 py-2 rounded-full text-sm font-semibold border transition
              ${
                active
                  ? "bg-red-600 text-white border-red-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
