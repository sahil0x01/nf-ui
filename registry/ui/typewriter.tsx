"use client";
import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export interface TypewriterProps extends React.ComponentProps<"span"> {
  text: string | string[];
  /** characters per second */
  speed?: number;
  /** ms to hold a finished line before erasing (array only) */
  hold?: number;
  loop?: boolean;
  cursor?: boolean;
}

/** Old-school typewriter. Pass an array to cycle lines. Respects reduced motion. */
export function Typewriter({
  text,
  speed = 14,
  hold = 1600,
  loop = false,
  cursor = true,
  className,
  ...props
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const lines = Array.isArray(text) ? text : [text];
  const [lineIdx, setLineIdx] = React.useState(0);
  const [count, setCount] = React.useState(reduce ? lines[0].length : 0);
  const [erasing, setErasing] = React.useState(false);
  const line = lines[lineIdx];

  React.useEffect(() => {
    if (reduce) {
      setCount(line.length);
      return;
    }
    const step = 1000 / speed;
    let t: ReturnType<typeof setTimeout>;
    if (!erasing && count < line.length) {
      t = setTimeout(() => setCount((c) => c + 1), step);
    } else if (!erasing && count === line.length) {
      const last = lineIdx === lines.length - 1;
      if (lines.length > 1 && (!last || loop)) t = setTimeout(() => setErasing(true), hold);
    } else if (erasing && count > 0) {
      t = setTimeout(() => setCount((c) => c - 1), step / 2);
    } else if (erasing && count === 0) {
      setErasing(false);
      setLineIdx((i) => (i + 1) % lines.length);
    }
    return () => clearTimeout(t);
  }, [count, erasing, line, lineIdx, lines.length, loop, hold, speed, reduce]);

  return (
    <span className={cn(className)} {...props}>
      <span aria-label={line}>{line.slice(0, count)}</span>
      {cursor && <span aria-hidden className="nf-cursor ml-0.5" />}
    </span>
  );
}
