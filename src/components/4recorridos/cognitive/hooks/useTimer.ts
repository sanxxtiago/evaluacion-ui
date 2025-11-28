import { useEffect, useRef, useState } from "react";

export default function useTimer() {
  const startRef = useRef<number | null>(null);
  const [durationSec, setDurationSec] = useState(0);
  const intervalRef = useRef<number | null>(null);

  function start() {
    startRef.current = Date.now();
    setDurationSec(0);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (startRef.current)
        setDurationSec(Math.round((Date.now() - startRef.current) / 1000));
    }, 500);
  }
  function stop() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (startRef.current)
      setDurationSec(Math.round((Date.now() - startRef.current) / 1000));
  }
  function reset() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startRef.current = null;
    setDurationSec(0);
  }

  useEffect(
    () => () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    },
    [],
  );

  return { start, stop, reset, durationSec };
}
