'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  cartId: string;           // ✅ UNIQUE PER CART ITEM
  productId: string;        // menu item _id
  name: string;
  image: string;
  basePrice: number;
  selectedSize?: { name: string; price: number };
  selectedExtras?: { name: string; price: number }[];
  quantity: number;
  finalPrice: number;
};


type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: CartItem) {
    setItems(prev => [...prev, item]);
  }

  function removeItem(cartId: string) {
  setItems(prev => prev.filter(item => item.cartId !== cartId));
}

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => {
    const sizePrice = item.size?.price || 0;
    const extrasPrice =
      item.extras?.reduce((s, e) => s + e.price, 0) || 0;

    return sum + (item.basePrice + sizePrice + extrasPrice) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
