"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingAddress } from "@/types";

const shippingSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  phone: z.string().min(10, "Nomor HP tidak valid").max(15),
  address: z.string().min(10, "Alamat terlalu pendek"),
  city: z.string().min(3, "Kota tidak valid"),
  province: z.string().min(3, "Provinsi tidak valid"),
  postal_code: z.string().min(5, "Kode pos tidak valid").max(5),
});

interface Props {
  onSubmit: (data: ShippingAddress) => void;
  isPending: boolean;
}

export default function ShippingForm({ onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingSchema),
  });

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Penerima
        </label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className={inputClass(!!errors.name)}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nomor HP
        </label>
        <input
          {...register("phone")}
          placeholder="08123456789"
          className={inputClass(!!errors.phone)}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Lengkap
        </label>
        <textarea
          {...register("address")}
          placeholder="Jl. Contoh No. 123, RT/RW 01/02"
          rows={3}
          className={inputClass(!!errors.address)}
        />
        {errors.address && (
          <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* City & Province */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kota
          </label>
          <input
            {...register("city")}
            placeholder="Jakarta"
            className={inputClass(!!errors.city)}
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provinsi
          </label>
          <input
            {...register("province")}
            placeholder="DKI Jakarta"
            className={inputClass(!!errors.province)}
          />
          {errors.province && (
            <p className="text-xs text-red-500 mt-1">{errors.province.message}</p>
          )}
        </div>
      </div>

      {/* Postal Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kode Pos
        </label>
        <input
          {...register("postal_code")}
          placeholder="12345"
          maxLength={5}
          className={inputClass(!!errors.postal_code)}
        />
        {errors.postal_code && (
          <p className="text-xs text-red-500 mt-1">{errors.postal_code.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition mt-2"
      >
        {isPending ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Buat Pesanan"
        )}
      </button>
    </form>
  );
}