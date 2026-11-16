import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Sprite icons defined as ASCII grids.
 *  #  currentColor      o  ink outline      w  light highlight      .  transparent
 * Add your own: any rectangular grid of those characters.
 */
export const sprites = {
  heart: [
    ".##..##.",
    "#w######",
    "########",
    "########",
    ".######.",
    "..####..",
    "...##...",
  ],
  star: [
    "...##...",
    "...##...",
    "########",
    ".#w####.",
    "..####..",
    ".######.",
    ".##..##.",
    "##....##",
  ],
  coin: [
    "..####..",
    ".#w####.",
    "###oo###",
    "###oo###",
    "###oo###",
    "###oo###",
    ".######.",
    "..####..",
  ],
  check: [
    "........",
    ".......#",
    "......##",
    "#....##.",
    "##..##..",
    ".####...",
    "..##....",
  ],
  cross: [
    "##....##",
    ".##..##.",
    "..####..",
    "...##...",
    "..####..",
    ".##..##.",
    "##....##",
  ],
  arrow: [
    "....#...",
    "....##..",
    "#######.",
    "########",
    "#######.",
    "....##..",
    "....#...",
  ],
  chevron: [
    "#.....#",
    "##...##",
    ".##.##.",
    "..###..",
    "...#...",
  ],
  "chevron-left": [
    "...#",
    "..##",
    ".##.",
    "##..",
    ".##.",
    "..##",
    "...#",
  ],
  "chevron-right": [
    "#...",
    "##..",
    ".##.",
    "..##",
    ".##.",
    "##..",
    "#...",
  ],
  calendar: [
    ".#....#.",
    "########",
    "#......#",
    "#.#.#..#",
    "#......#",
    "#..#.#.#",
    "#......#",
    "########",
  ],
  menu: [
    "########",
    "########",
    "........",
    "########",
    "########",
    "........",
    "########",
    "########",
  ],
  sun: [
    "...#...",
    "#..#..#",
    ".#####.",
    "#######",
    "#######",
    ".#####.",
    "#..#..#",
    "...#...",
  ],
  moon: [
    "..####.",
    ".###...",
    "###....",
    "###....",
    "###....",
    ".###..#",
    "..#####",
  ],
  plus: [
    "..##..",
    "..##..",
    "######",
    "######",
    "..##..",
    "..##..",
  ],
  minus: [
    "######",
    "######",
  ],
  info: [
    "..##..",
    "..##..",
    "......",
    "..##..",
    "..##..",
    "..##..",
    "..##..",
  ],
  search: [
    ".####...",
    "#....#..",
    "#....#..",
    "#....#..",
    ".####...",
    "....##..",
    ".....##.",
    "......##",
  ],
  sparkle: [
    "...#...",
    "...#...",
    "..###..",
    "#######",
    "..###..",
    "...#...",
    "...#...",
  ],
} as const;

export type PixelIconName = keyof typeof sprites;

export function PixelIcon({
  name,
  size = 3,
  className,
  title,
}: {
  name: PixelIconName;
  /** CSS px per sprite pixel */
  size?: number;
  className?: string;
  title?: string;
}) {
  const grid: readonly string[] = sprites[name];
  const w = grid[0].length;
  const h = grid.length;
  const cells: React.ReactNode[] = [];
  grid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === ".") return;
      const fill = c === "o" ? "var(--nf-ink)" : c === "w" ? "var(--nf-bevel-light)" : "currentColor";
      cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />);
    }),
  );
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("inline-block shrink-0", className)}
    >
      {title && <title>{title}</title>}
      {cells}
    </svg>
  );
}
