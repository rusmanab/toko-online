"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";
import { LoginPayload, RegisterPayload } from "../types";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      router.push("/login");
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    retry: false,
  });
}