"use client";

type Extra = { name: string; price: number };

export default function ExtrasEditor({
  items,
  setItems,
}: {
  items: Extra[];
  setItems: (items: Extra[]) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((e, i) => (
        <div key={i} className="flex gap-3">
          <input
            placeholder="Ingredient"
            value={e.name}
            onChange={(ev) =>
              setItems(
                items.map((x, j) =>
                  j === i ? { ...x, name: ev.target.value } : x
                )
              )
            }
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Price"
            value={e.price}
            onChange={(ev) =>
              setItems(
                items.map((x, j) =>
                  j === i ? { ...x, price: Number(ev.target.value) } : x
                )
              )
            }
            className="w-28 border rounded-lg px-3 py-2 text-sm"
          />

          <button onClick={() => setItems(items.filter((_, j) => j !== i))}>
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={() => setItems([...items, { name: "", price: 0 }])}
        className="text-sm text-red-600 font-medium"
      >
        + Add extra ingredient
      </button>
    </div>
  );
}
