'use client';

type Extra = {
  name: string;
  price: number;
};

export default function ExtrasEditor({
  items,
  setItems,
}: {
  items: Extra[];
  setItems: (items: Extra[]) => void;
}) {
  function addExtra() {
    setItems([...items, { name: "", price: 0 }]);
  }

  function updateExtra(
    index: number,
    field: keyof Extra,
    value: string | number
  ) {
    const copy = [...items];
    copy[index] = { ...copy[index], [field]: value };
    setItems(copy);
  }

  function removeExtra(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {items.map((extra, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            placeholder="Ingredient name"
            value={extra.name}
            onChange={(e) =>
              updateExtra(index, "name", e.target.value)
            }
            className="flex-1 px-3 py-2 rounded-lg border text-sm"
          />

          <input
            type="number"
            placeholder="Extra price"
            value={extra.price}
            onChange={(e) =>
              updateExtra(index, "price", Number(e.target.value))
            }
            className="w-28 px-3 py-2 rounded-lg border text-sm"
          />

          <button
            type="button"
            onClick={() => removeExtra(index)}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addExtra}
        className="text-sm text-red-600 font-medium"
      >
        + Add extra ingredient
      </button>
    </div>
  );
}
