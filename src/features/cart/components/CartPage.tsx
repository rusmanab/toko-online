"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCart();

  // Empty State
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <ShoppingCart size={64} strokeWidth={1} />
        <p className="text-xl font-semibold mt-4 text-gray-600">
          Keranjang kamu kosong
        </p>
        <p className="text-sm mt-1">Yuk mulai belanja!</p>
        <Link
          href="/products"
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-900">
              Produk ({items.length})
            </h2>
            <button
              onClick={clearCart}
              className="text-xs text-red-400 hover:text-red-600 transition"
            >
              Hapus Semua
            </button>
          </div>

          {/* Items */}
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
}