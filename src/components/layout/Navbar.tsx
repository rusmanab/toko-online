"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User,LogOut } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useMe, useLogout } from "@/features/auth/hooks/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  //const cartCount = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.totalItems());

  const { data: user } = useMe();
  const { mutate: logout } = useLogout();


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            TokoKu
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-blue-600 transition">Produk</Link>
            <Link href="/categories" className="hover:text-blue-600 transition">Kategori</Link>
            <Link href="/about" className="hover:text-blue-600 transition">Tentang</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="text-gray-500 hover:text-blue-600 transition">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-500 hover:text-blue-600 transition">
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-sm text-gray-600 font-medium">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-500 hover:text-blue-600 transition">
                <User size={20} />
              </Link>
            )}

            {/* Hamburger - Mobile */}
            <button
              className="md:hidden text-gray-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600">
          <Link href="/products" onClick={() => setMenuOpen(false)}>Produk</Link>
          <Link href="/categories" onClick={() => setMenuOpen(false)}>Kategori</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Tentang</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </header>
  );
}