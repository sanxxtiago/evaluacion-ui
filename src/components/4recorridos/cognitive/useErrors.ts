// src/components/4recorridos/cognitive/useErrors.ts
import { useState } from "react";
import type { ErrorItem } from "./cognitiveStore";

export function useErrors() {
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  function addError(detail: string) {
    setErrors((prev) => [
      ...prev,
      {
        detail,
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  return { errors, addError };
}
