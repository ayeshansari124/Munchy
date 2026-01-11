import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        w-full
        bg-white
        rounded-2xl
        shadow-lg
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
