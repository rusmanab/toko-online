"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  lastPage: number;
}

export default function Pagination({ currentPage, lastPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (lastPage <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}