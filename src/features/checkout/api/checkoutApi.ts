import api from "@/lib/api";
import { CheckoutPayload } from "@/types";

export const checkoutApi = {
  createOrder: async (payload: CheckoutPayload) => {
    const res = await api.post("/orders", payload);
    return res.data;
  },

  getSnapToken: async (orderId: number) => {
    const res = await api.post(`/orders/${orderId}/payment`);
    return res.data;
  },
};