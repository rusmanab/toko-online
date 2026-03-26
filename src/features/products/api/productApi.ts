import api from "@/lib/api";
import { Product, ApiResponse, ProductFilter } from "@/types";

export const productApi = {
  getAll: async (params?: ProductFilter): Promise<ApiResponse<Product[]>> => {
    const res = await api.get("/products", { params });
    return res.data;
  },

  getBySlug: async (slug: string): Promise<Product> => {
    const res = await api.get(`/products/${slug}`);
    return res.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const res = await api.get("/products/featured");
    return res.data;
  },

  getCategories: async () => {
    const res = await api.get("/categories");
    return res.data;
  },
};