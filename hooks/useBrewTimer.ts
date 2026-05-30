import { useEffect, useRef, useState } from "react";
import type { Step } from "@/data/recipes";

function activeStepIndex(steps: Step[], elapsed: number): number {
  let active = -1;
  for (let i = 0; i < steps.length; i++) {
    const at = steps[i].at;
    if (at !== undefined && at <= elapsed) {
      active = i;
    }
  }
  return active;
}

export function useBrewTimer(steps: Step[]) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lastAt = steps.reduce(
    (max, step) => (step.at !== undefined && step.at > max ? step.at : max),
    0
  );

  useEffect(() => {
    if (!running) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((current) => {
        const next = current + 1;
        if (next >= lastAt) {
          setRunning(false);
          return lastAt;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, lastAt]);

  const toggle = () => setRunning((value) => !value);
  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  const activeIndex =
    running || elapsed > 0 ? activeStepIndex(steps, elapsed) : -1;

  return { elapsed, running, activeIndex, toggle, reset };
}
