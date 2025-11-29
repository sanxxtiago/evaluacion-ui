// src/components/4recorridos/cognitive/useTimer.ts
import { useEffect, useRef, useState } from "react";

export function useTimer(autoStart = true) {
  const [running, setRunning] = useState(autoStart);
  const [durationSec, setDurationSec] = useState(0);
  const startedAtRef = useRef<Date | null>(autoStart ? new Date() : null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        if (startedAtRef.current) {
          const diff = (Date.now() - startedAtRef.current.getTime()) / 1000;
          setDurationSec(Math.floor(diff));
        }
      }, 1000);
    } else if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  function start() {
    if (!running) {
      startedAtRef.current = new Date();
      setRunning(true);
    }
  }

  function stop() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    startedAtRef.current = null;
    setDurationSec(0);
  }

  return {
    running,
    durationSec,
    startedAt: startedAtRef.current,
    start,
    stop,
    reset,
  };
}
