import { InputHTMLAttributes } from "react";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label: string;
  onChange?: (value: string) => void;
};

export default function Input({ label, onChange, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        {...props}
        value={props.value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-red-500
          disabled:bg-gray-100
          disabled:text-gray-500
        "
      />
    </div>
  );
}
