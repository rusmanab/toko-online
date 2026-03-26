"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { formatRupiah } from "@/utils";
import { ShoppingBag } from "lucide-react";

const SHIPPING_THRESHOLD = 100000;
const SHIPPING_COST = 15000;

export default function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  const shippingCost = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h2 className="font-bold text-gray-900 text-lg mb-5">Ringkasan Pesanan</h2>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} item)</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-600">
          <span>Ongkos Kirim</span>
          {shippingCost === 0 ? (
            <span className="text-green-600 font-medium">Gratis</span>
          ) : (
            <span>{formatRupiah(shippingCost)}</span>
          )}
        </div>

        {/* Free shipping info */}
        {shippingCost > 0 && (
          <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
            Tambah {formatRupiah(SHIPPING_THRESHOLD - totalPrice)} lagi untuk gratis ongkir!
          </p>
        )}

        <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base">
          <span>Total</span>
          <span className="text-blue-600">{formatRupiah(grandTotal)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
      >
        <ShoppingBag size={20} />
        Lanjut ke Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        href="/products"
        className="mt-3 w-full flex items-center justify-center text-sm text-gray-500 hover:text-blue-600 transition"
      >
        Lanjutkan Belanja
      </Link>
    </div>
  );
}