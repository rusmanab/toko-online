import { Suspense } from "react";
import CartPage from "@/features/cart/components/CartPage";

export const metadata = {
  title: "Keranjang Belanja",
};

export default function Cart() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Keranjang Belanja
      </h1>
      <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
        <CartPage />
      </Suspense>
    </div>
  );
}