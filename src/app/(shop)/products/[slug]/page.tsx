import { Suspense } from "react";
import ProductDetail from "@/features/products/components/ProductDetail";
import ProductDetailSkeleton from "@/features/products/components/ProductDetailSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← await dulu
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Detail produk",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← await dulu

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={slug} />
      </Suspense>
    </div>
  );
}