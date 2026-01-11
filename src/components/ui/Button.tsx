import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  const base =
    "w-full py-3 rounded-full font-semibold transition disabled:opacity-60";

  const styles =
    variant === "primary"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "border border-gray-300 hover:bg-gray-100";

  return (
    <button {...props} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
