import { useEffect, useState } from "react";

export type PagePhase = "enter" | "idle" | "leave";

export function usePageTransition(duration = 500) {
  const [phase, setPhase] = useState<PagePhase>("enter");

  useEffect(() => {
    requestAnimationFrame(() => {
      setPhase("idle");
    });
  }, []);

  const leave = (callback?: () => void) => {
    setPhase("leave");
    if (callback) {
      setTimeout(callback, duration);
    }
  };

  return { phase, leave };
}
