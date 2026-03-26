import { useCartStore } from "../store/cartStore";
import { CartItem } from "@/types";

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCartStore();

  const isInCart = (id: number) => items.some((i) => i.id === id);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: totalItems(),
    totalPrice: totalPrice(),
    isInCart,
  };
}