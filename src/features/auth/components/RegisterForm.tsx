"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useRegister } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password tidak cocok",
    path: ["password_confirmation"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: register, isPending, isError } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TokoKu
        </Link>
        <h1 className="text-xl font-bold text-gray-900 mt-4">Buat Akun Baru</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Masuk sekarang
          </Link>
        </p>
      </div>

      {/* Error API */}
      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          Gagal mendaftar. Email mungkin sudah terdaftar.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            {...registerField("name")}
            type="text"
            placeholder="John Doe"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.name ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...registerField("email")}
            type="email"
            placeholder="email@example.com"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              {...registerField("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 6 karakter"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10 ${
                errors.password ? "border-red-400" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              {...registerField("password_confirmation")}
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi password"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10 ${
                errors.password_confirmation ? "border-red-400" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <UserPlus size={18} />
              Daftar
            </>
          )}
        </button>
      </form>
    </div>
  );
}