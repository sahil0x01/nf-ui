import * as React from "react";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

/** Stepped ticker strip (moves in jumps, like a sprite scroller). */
export function Marquee({ items, className }: { items: React.ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span>{it}</span>
          <PixelIcon name="star" size={2} />
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden bg-accent py-2 text-accent-foreground", className)}>
      <div className="flex w-max animate-marquee font-display text-sm font-semibold whitespace-nowrap">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
