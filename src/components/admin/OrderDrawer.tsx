'use client';

export default function OrderDrawer({ order, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 mb-4"
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-4">
          Order #{order._id.slice(-6)}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {order.user?.name}
        </p>

        <div className="space-y-4">
          {order.items.map((item: any, i: number) => (
            <div
              key={i}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between font-semibold">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.finalPrice}</span>
              </div>

              {item.selectedSize && (
                <p className="text-sm text-gray-600">
                  Size: {item.selectedSize.name}
                </p>
              )}

              {item.selectedExtras?.length > 0 && (
                <p className="text-sm text-gray-600">
                  Extras: {item.selectedExtras.map((e: any) => e.name).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 font-bold text-lg">
          Total: ₹{order.total}
        </div>
      </div>
    </div>
  );
}
