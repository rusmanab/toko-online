"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Package, ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { formatRupiah } from "@/utils";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

// Dummy data sementara sebelum API ready
const dummyProduct = {
  id: 1,
  name: "Produk Contoh Detail",
  slug: "produk-contoh-1",
  description: "Ini adalah deskripsi lengkap produk. Produk ini berkualitas tinggi dan tahan lama. Cocok untuk kebutuhan sehari-hari.",
  price: 150000,
  stock: 10,
  image: "",
  category: { id: 1, name: "Elektronik", slug: "elektronik" },
};

interface Props {
  slug: string;
}

export default function ProductDetail({ slug }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError } = useProduct(slug);
  const { addItem, isInCart } = useCart();

  const displayProduct = isError || !product ? dummyProduct : product;

  if (isLoading) return <ProductDetailSkeleton />;

  const handleAddToCart = () => {
    addItem({
      id: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price,
      quantity,
      image: displayProduct.image,
    });
  };

  const incrementQty = () => {
    if (quantity < displayProduct.stock) setQuantity((q) => q + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-8"
      >
        <ArrowLeft size={16} />
        Kembali ke Produk
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          {displayProduct.image ? (
            <Image
              src={displayProduct.image}
              alt={displayProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Category */}
          <span className="text-sm text-blue-600 font-medium">
            {displayProduct.category?.name}
          </span>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {displayProduct.name}
          </h1>

          {/* Price */}
          <div className="text-3xl font-bold text-blue-600">
            {formatRupiah(displayProduct.price)}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            <Package size={16} className="text-gray-400" />
            {displayProduct.stock > 0 ? (
              <span className="text-green-600 font-medium">
                Stok tersedia ({displayProduct.stock} item)
              </span>
            ) : (
              <span className="text-red-500 font-medium">Stok habis</span>
            )}
          </div>

          {/* Description */}
          <div className="text-gray-600 leading-relaxed border-t pt-4">
            {displayProduct.description}
          </div>

          {/* Quantity Selector */}
          {displayProduct.stock > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Jumlah:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-sm font-semibold border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={quantity >= displayProduct.stock}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={displayProduct.stock === 0}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition ${
              isInCart(displayProduct.id)
                ? "bg-green-500 text-white hover:bg-green-600"
                : displayProduct.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={20} />
            {isInCart(displayProduct.id)
              ? "Sudah di Keranjang"
              : displayProduct.stock === 0
              ? "Stok Habis"
              : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}