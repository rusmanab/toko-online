"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLogin } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TokoKu
        </Link>
        <h1 className="text-xl font-bold text-gray-900 mt-4">Masuk ke Akun</h1>
        <p className="text-gray-500 text-sm mt-1">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Daftar sekarang
          </Link>
        </p>
      </div>

      {/* Error API */}
      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          Email atau password salah
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
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
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
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

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline"
          >
            Lupa password?
          </Link>
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
              <LogIn size={18} />
              Masuk
            </>
          )}
        </button>
      </form>
    </div>
  );
}