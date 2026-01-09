'use client';

export default function SizesEditor({ items, setItems }: any) {
  function add() {
    setItems([...items, { name: "", price: 0 }]);
  }

  function update(index: number, field: string, value: any) {
    const copy = [...items];
    copy[index][field] = value;
    setItems(copy);
  }

  function remove(index: number) {
    setItems(items.filter((_: any, i: number) => i !== index));
  }

  return (
    <div className="space-y-3">
      {items.map((s: any, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <input
            placeholder="Size name"
            value={s.name}
            onChange={(e) => update(i, "name", e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border text-sm"
          />

          <input
            placeholder="Extra price"
            type="number"
            value={s.price}
            onChange={(e) => update(i, "price", Number(e.target.value))}
            className="w-28 px-3 py-2 rounded-lg border text-sm"
          />

          <button
            type="button"
            onClick={() => remove(i)}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="text-sm text-red-600 font-medium"
      >
        + Add item size
      </button>
    </div>
  );
}
