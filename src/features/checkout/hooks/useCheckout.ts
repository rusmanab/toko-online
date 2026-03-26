"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { checkoutApi } from "../api/checkoutApi";
import { useCart } from "@/features/cart/hooks/useCart";
import { CheckoutPayload, ShippingAddress } from "@/types";

const SHIPPING_THRESHOLD = 100000;
const SHIPPING_COST = 15000;

export function useCheckout() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const shippingCost = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = totalPrice + shippingCost;

  const { mutate: createOrder, isPending, isError } = useMutation({
    mutationFn: (shippingAddress: ShippingAddress) => {
      const payload: CheckoutPayload = {
        shipping_address: shippingAddress,
        shipping_cost: shippingCost,
        total: grandTotal,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      return checkoutApi.createOrder(payload);
    },
    onSuccess: (data) => {
      clearCart();
      router.push(`/orders/${data.id}`);
    },
  });

  return {
    createOrder,
    isPending,
    isError,
    items,
    totalPrice,
    shippingCost,
    grandTotal,
  };
}