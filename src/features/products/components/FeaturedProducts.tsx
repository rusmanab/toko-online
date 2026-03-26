import { productApi } from "../api/productApi";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default async function FeaturedProducts() {
  // Server component — fetch langsung tanpa useQuery
  let products = [];

  try {
    products = await productApi.getFeatured();
  } catch {
    // Kalau API belum ready, pakai dummy data
    products = dummyProducts;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Produk Unggulan</h2>
          <p className="text-gray-500 mt-1">Pilihan terbaik untuk kamu</p>
        </div>
        <Link
          href="/products"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Lihat Semua →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// Dummy data sementara sebelum API Laravel ready
const dummyProducts = [
  {
    id: 1,
    name: "Produk Contoh 1",
    slug: "produk-contoh-1",
    description: "Deskripsi produk",
    price: 150000,
    stock: 10,
    image: "/placeholder.png",
    category: { id: 1, name: "Elektronik", slug: "elektronik" },
  },
  {
    id: 2,
    name: "Produk Contoh 2",
    slug: "produk-contoh-2",
    description: "Deskripsi produk",
    price: 250000,
    stock: 5,
    image: "/placeholder.png",
    category: { id: 1, name: "Elektronik", slug: "elektronik" },
  },
  {
    id: 3,
    name: "Produk Contoh 3",
    slug: "produk-contoh-3",
    description: "Deskripsi produk",
    price: 99000,
    stock: 0,
    image: "/placeholder.png",
    category: { id: 2, name: "Fashion", slug: "fashion" },
  },
  {
    id: 4,
    name: "Produk Contoh 4",
    slug: "produk-contoh-4",
    description: "Deskripsi produk",
    price: 320000,
    stock: 8,
    image: "/placeholder.png",
    category: { id: 2, name: "Fashion", slug: "fashion" },
  },
];