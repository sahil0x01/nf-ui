import * as React from "react";
import { cn } from "@/lib/cn";

/** Segmented health-bar style progress. value 0–100. */
export function Progress({
  value,
  segments = 12,
  tone = "accent",
  className,
}: {
  value: number;
  segments?: number;
  tone?: "accent" | "sun" | "teal" | "sage";
  className?: string;
}) {
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * segments);
  const toneCls = { accent: "bg-accent", sun: "bg-sun", teal: "bg-teal", sage: "bg-sage" }[tone];
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={cn("nf-pixel-inset flex gap-0.5 bg-surface-2 p-0.5", className)}
    >
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={cn("h-3 flex-1", i < filled ? toneCls : "bg-transparent")} />
      ))}
    </div>
  );
}
