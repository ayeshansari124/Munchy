'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const capsules = [
  { label: "Categories", href: "/admin/categories" },
  { label: "Menu", href: "/admin/menu" },
  { label: "Orders", href: "/admin/orders" },
];

const AdminCapsules = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center gap-4 mt-6">
      {capsules.map((cap) => {
        const isActive = pathname.startsWith(cap.href);

        return (
          <Link
            key={cap.href}
            href={cap.href}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold transition
              border
              ${
                isActive
                  ? "bg-red-600 text-white border-red-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600"
              }
            `}
          >
            {cap.label}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminCapsules;
