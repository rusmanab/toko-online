import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">TokoKu</h3>
            <p className="text-sm leading-relaxed">
              Toko online terpercaya dengan produk berkualitas dan pengiriman cepat.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-white transition"><Instagram size={18} /></a>
              <a href="#" className="hover:text-white transition"><Facebook size={18} /></a>
              <a href="#" className="hover:text-white transition"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h4 className="text-white font-semibold mb-3">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition">Semua Produk</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Kategori</Link></li>
              <li><Link href="/promo" className="hover:text-white transition">Promo</Link></li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-white font-semibold mb-3">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Info Pengiriman</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Pengembalian</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Kontak Kami</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 hello@tokoku.id</li>
              <li>📱 0812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} TokoKu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}