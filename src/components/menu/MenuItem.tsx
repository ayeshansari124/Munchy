import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Props = {
  name: string;
  image?: string;
  description: string;
  basePrice: number;
};

const FALLBACK_IMAGE = "/pizza.webp";

export default function MenuItem({
  name,
  image,
  description,
  basePrice,
}: Props) {
  const imageSrc =
    image && image.startsWith("http")
      ? image
      : FALLBACK_IMAGE;

  return (
    <div className="relative bg-white rounded-2xl shadow-md p-6 text-center">

      {/* PRICE */}
      <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
        ₹{basePrice}
      </div>

      {/* IMAGE */}
      <div className="h-[220px] flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={name || "Menu item"}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <h4 className="mt-4 text-lg font-extrabold text-red-600">
        {name}
      </h4>

      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {description}
      </p>

      <button className="mt-5 w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-full font-semibold">
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
}
