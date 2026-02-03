import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "../contexts/CartContext";
import type { CartState } from "../models/cartModel";

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartState>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const remove = (id: string) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setCart(prev => ({ ...prev, [id]: qty }));
  };

  const clear = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
};
