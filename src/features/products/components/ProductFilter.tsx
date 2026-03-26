"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const categories = [
  { id: "all", name: "Semua" },
  { id: "elektronik", name: "Elektronik" },
  { id: "fashion", name: "Fashion" },
  { id: "makanan", name: "Makanan & Minuman" },
  { id: "olahraga", name: "Olahraga" },
];

const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "price_asc", label: "Harga: Terendah" },
  { value: "price_desc", label: "Harga: Tertinggi" },
];

export default function ProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "newest";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset ke page 1 kalau filter berubah
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="space-y-6">
      {/* Kategori */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Kategori</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateFilter("category", cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  activeCategory === cat.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Urutkan */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Urutkan</h3>
        <ul className="space-y-1">
          {sortOptions.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => updateFilter("sort", opt.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  activeSort === opt.value
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Filter */}
      <button
        onClick={() => router.push(pathname)}
        className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        Reset Filter
      </button>
    </div>
  );
}