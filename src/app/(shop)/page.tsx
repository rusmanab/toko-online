import Banner from "@/features/home/components/Banner";

import FeaturedProducts from "@/features/products/components/FeaturedProducts";

export const metadata = {
  title: "Toko Online - Belanja Mudah & Terpercaya",
  description: "Temukan produk terbaik dengan harga terjangkau",
};

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
    </div>
  );
}