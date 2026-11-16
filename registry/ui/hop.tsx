"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

/** Hops (4-frame jump) when hovered or focused. Pure CSS; disabled under reduced motion. */
export function Hop({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      tabIndex={0}
      className={cn("inline-block cursor-default hover:animate-hop focus-visible:animate-hop", className)}
      {...props}
    />
  );
}
