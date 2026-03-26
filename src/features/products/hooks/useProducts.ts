import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/productApi";

export function useProducts(params?: {
  page?: number;
  category?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.getAll(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: productApi.getFeatured,
  });
}