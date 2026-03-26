"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatRupiah } from "@/utils";
import { useCart } from "@/features/cart/hooks/useCart";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition group overflow-hidden border border-gray-100">
      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-800 hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 mt-1">{product.category?.name}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-600 font-bold text-lg">
            {formatRupiah(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
              isInCart(product.id)
                ? "bg-green-100 text-green-600"
                : product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={16} />
            {isInCart(product.id)
              ? "Ditambahkan"
              : product.stock === 0
              ? "Habis"
              : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}