"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Promo Akhir Tahun",
    subtitle: "Diskon hingga 70% untuk semua produk pilihan",
    bg: "from-blue-600 to-blue-400",
    cta: "Belanja Sekarang",
    href: "/products",
  },
  {
    id: 2,
    title: "Koleksi Terbaru",
    subtitle: "Temukan produk terbaru kami yang keren",
    bg: "from-purple-600 to-purple-400",
    cta: "Lihat Koleksi",
    href: "/products?sort=newest",
  },
  {
    id: 3,
    title: "Gratis Ongkir",
    subtitle: "Gratis ongkos kirim untuk pembelian di atas Rp 100.000",
    bg: "from-emerald-600 to-emerald-400",
    cta: "Cek Syarat",
    href: "/promo",
  },
];

export default function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Sync dot indicator
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`min-w-full bg-gradient-to-r ${slide.bg} text-white`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                <p className="text-lg md:text-xl opacity-90 max-w-xl">{slide.subtitle}</p>
                <a
                  href={slide.href}
                  className="mt-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Button */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selectedIndex ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}