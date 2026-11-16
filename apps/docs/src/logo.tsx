import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * The nullfuse mark: a hollow pixel "null" block with a lit fuse spark.
 *  #  currentColor (ink)   d  danger spark   .  transparent
 */
export const logoGrid = [
  "........d.",
  ".......ddd",
  "########d.",
  "#......#..",
  "#.####.#..",
  "#.#..#.#..",
  "#.#..#.#..",
  "#.####.#..",
  "#......#..",
  "########..",
] as const;

const fills = { "#": "currentColor", d: "var(--nf-danger)" } as const;

export function NullfuseMark({ size = 2, className, title = "nullfuse" }: { size?: number; className?: string; title?: string }) {
  const w = logoGrid[0].length;
  const h = logoGrid.length;
  const cells: React.ReactNode[] = [];
  logoGrid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === ".") return;
      cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fills[c as "#" | "d"]} />);
    }),
  );
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
      className={cn("inline-block shrink-0 overflow-visible", className)}
    >
      {cells}
    </svg>
  );
}

/** Mark + wordmark, used in the header and footer. */
export function NullfuseLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <NullfuseMark size={2} className="text-ink" />
      <span>nullfuse</span>
    </span>
  );
}
