"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCheckout } from "../hooks/useCheckout";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import { ShippingAddress } from "@/types";

export default function CheckoutPage() {
  const {
    createOrder,
    isPending,
    isError,
    items,
    totalPrice,
    shippingCost,
    grandTotal,
  } = useCheckout();

  // Kalau cart kosong
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <ShoppingBag size={64} strokeWidth={1} />
        <p className="text-xl font-semibold mt-4 text-gray-600">
          Keranjang kamu kosong
        </p>
        <p className="text-sm mt-1">Tambah produk dulu sebelum checkout</p>
        <Link
          href="/products"
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  const handleSubmit = (data: ShippingAddress) => {
    createOrder(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Pengiriman */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-5">
            Alamat Pengiriman
          </h2>

          {/* Error */}
          {isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              Gagal membuat pesanan. Pastikan kamu sudah login.
            </div>
          )}

          <ShippingForm onSubmit={handleSubmit} isPending={isPending} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary
          items={items}
          totalPrice={totalPrice}
          shippingCost={shippingCost}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
