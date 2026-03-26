import { Suspense } from "react";
import ProductList from "@/features/products/components/ProductList";
import ProductFilter from "@/features/products/components/ProductFilter";

export const metadata = {
  title: "Semua Produk",
  description: "Temukan semua produk terbaik kami",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string; sort?: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Semua Produk</h1>
        <p className="text-gray-500 mt-1">Temukan produk yang kamu cari</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          {/* Suspense wajib karena pakai useSearchParams */}
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />}>
            <ProductFilter />
          </Suspense>
        </aside>

        <div className="flex-1">
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
            <ProductList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
