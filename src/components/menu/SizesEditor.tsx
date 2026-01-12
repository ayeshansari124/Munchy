"use client";

export default function SizesEditor({ items, setItems }: any) {
  return (
    <div className="space-y-3">
      {items.map((s: any, i: number) => (
        <div key={i} className="flex gap-3">
          <input
            placeholder="Size"
            value={s.name}
            onChange={(e) =>
              setItems(
                items.map((x: any, j: number) =>
                  j === i ? { ...x, name: e.target.value } : x
                )
              )
            }
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Price"
            value={s.price}
            onChange={(e) =>
              setItems(
                items.map((x: any, j: number) =>
                  j === i ? { ...x, price: Number(e.target.value) } : x
                )
              )
            }
            className="w-28 border rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={() =>
              setItems(items.filter((_: any, j: number) => j !== i))
            }
          >
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={() => setItems([...items, { name: "", price: 0 }])}
        className="text-sm text-red-600 font-medium"
      >
        + Add item size
      </button>
    </div>
  );
}
