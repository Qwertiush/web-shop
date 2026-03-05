import { createContext, useContext } from "react";
import type { CartState } from "../models/cartModel";

interface CartContextValue {
  cart: CartState;
  add: (id: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
