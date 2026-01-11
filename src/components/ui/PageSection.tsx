import { ReactNode } from "react";

export default function PageSection({
  children,
  size = "md",
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const max =
    size === "sm"
      ? "max-w-3xl"
      : size === "lg"
      ? "max-w-7xl"
      : "max-w-5xl";

  return (
    <section className="bg-white py-8">
      <div className={`${max} mx-auto px-6`}>
        {children}
      </div>
    </section>
  );
}
