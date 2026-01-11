export default function Divider({ label = "OR" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs font-medium text-gray-400">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
