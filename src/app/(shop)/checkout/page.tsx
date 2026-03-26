import { Suspense } from "react";
import CheckoutPage from "@/features/checkout/components/CheckoutPage";

export const metadata = {
  title: "Checkout",
};

export default function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
        <CheckoutPage />
      </Suspense>
    </div>
  );
}