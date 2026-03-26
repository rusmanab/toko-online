"use client";

import Image from "next/image";
import { formatRupiah } from "@/utils";
import { CartItem } from "@/types";

interface Props {
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}

export default function OrderSummary({
  items,
  totalPrice,
  shippingCost,
  grandTotal,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h2 className="font-bold text-gray-900 text-lg mb-5">Ringkasan Pesanan</h2>

      {/* Items */}
      <div className="space-y-3 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                  No Img
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-400">x{item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-gray-700 shrink-0">
              {formatRupiah(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Ongkos Kirim</span>
          {shippingCost === 0 ? (
            <span className="text-green-600 font-medium">Gratis</span>
          ) : (
            <span>{formatRupiah(shippingCost)}</span>
          )}
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t">
          <span>Total</span>
          <span className="text-blue-600">{formatRupiah(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}