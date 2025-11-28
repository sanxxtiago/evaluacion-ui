import { useState } from "react";

export type ErrorRecord = { ts: string; detail: string };
export default function useErrors() {
  const [errors, setErrors] = useState<ErrorRecord[]>([]);
  function registerError(detail: string) {
    setErrors((prev) => [...prev, { ts: new Date().toISOString(), detail }]);
  }
  function clear() {
    setErrors([]);
  }
  return { errors, registerError, clear };
}
