"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "../hooks/useCart";
import { formatRupiah } from "@/utils";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-800 line-clamp-2">{item.name}</h3>
          {/* Hapus */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition shrink-0"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() =>
                item.quantity <= 1
                  ? removeItem(item.id)
                  : updateQuantity(item.id, item.quantity - 1)
              }
              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Subtotal */}
          <span className="font-bold text-blue-600">
            {formatRupiah(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}