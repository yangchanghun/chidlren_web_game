// src/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/api/auth.api";

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
