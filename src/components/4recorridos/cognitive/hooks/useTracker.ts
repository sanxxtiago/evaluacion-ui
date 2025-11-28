import { useState } from "react";

export type StepRecord = { ts: string; detail: string };
export default function useTracker() {
  const [steps, setSteps] = useState<StepRecord[]>([]);
  function registerStep(detail: string) {
    setSteps((prev) => [...prev, { ts: new Date().toISOString(), detail }]);
  }
  function clear() {
    setSteps([]);
  }
  return { steps, registerStep, clear };
}
