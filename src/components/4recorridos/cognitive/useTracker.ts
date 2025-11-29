// src/components/4recorridos/cognitive/useTracker.ts
import { useState } from "react";
import type { Step } from "./cognitiveStore";

export function useTracker() {
  const [steps, setSteps] = useState<Step[]>([]);

  function addStep(detail: string) {
    setSteps((prev) => [
      ...prev,
      {
        detail,
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  return { steps, addStep };
}
