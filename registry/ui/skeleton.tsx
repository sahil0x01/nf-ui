import * as React from "react";
import { cn } from "@/lib/cn";

/** Loading placeholder: blinks in two frames (no smooth pulse). */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("animate-skeleton bg-surface-2", className)} {...props} />;
}
