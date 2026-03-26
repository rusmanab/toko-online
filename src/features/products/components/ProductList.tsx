"use client";

import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import Pagination from "@/components/Pagination";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ProductFilter } from "@/types";

interface Props {
  searchParams: ProductFilter & { page?: string };
}

export default function ProductList({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState(searchParams.search || "");

  
  const { data, isLoading,isError } = useProducts({
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  });
  
  // Tambah dummy data kalau API belum ready
  


  const dummyProducts = [
    {
      id: 1, name: "Produk Contoh 1", slug: "produk-contoh-1",
      description: "Deskripsi produk", price: 150000, stock: 10,
      image: "", category: { id: 1, name: "Elektronik", slug: "elektronik" },
    },
    {
      id: 2, name: "Produk Contoh 2", slug: "produk-contoh-2",
      description: "Deskripsi produk", price: 250000, stock: 5,
      image: "", category: { id: 1, name: "Elektronik", slug: "elektronik" },
    },
    {
      id: 3, name: "Produk Contoh 3", slug: "produk-contoh-3",
      description: "Deskripsi produk", price: 99000, stock: 0,
      image: "", category: { id: 2, name: "Fashion", slug: "fashion" },
    },
    {
      id: 4, name: "Produk Contoh 4", slug: "produk-contoh-4",
      description: "Deskripsi produk", price: 320000, stock: 8,
      image: "", category: { id: 2, name: "Fashion", slug: "fashion" },
    },
  ];

  const displayData = isError ? {
    data: dummyProducts,
    meta: { current_page: 1, last_page: 1, per_page: 8, total: 4 }
  } : null;

  console.log(`${displayData} ${isError}`)

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newParams = new URLSearchParams(params.toString());
      if (search) {
        newParams.set("search", search);
      } else {
        newParams.delete("search");
      }
      newParams.delete("page");
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [search, params, pathname, router]
  );

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error 
      {isError && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Gagal memuat produk 😢</p>
          <p className="text-sm mt-1">Coba refresh halaman</p>
        </div>
      )}
        */}

      {/* Empty */}
      {!isLoading && !isError && displayData?.data?.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Produk tidak ditemukan 🔍</p>
          <p className="text-sm mt-1">Coba kata kunci lain</p>
        </div>
      )}

      {/* Grid 
      isLoading && isError &&
      */}
      { displayData?.data && displayData.data.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {displayData.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {displayData.meta && (
            <Pagination
              currentPage={displayData.meta.current_page}
              lastPage={displayData.meta.last_page}
            />
          )}
        </>
      )}
    </div>
  );
}