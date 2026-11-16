import * as React from "react";
import { cn } from "@/lib/cn";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "nf-pixel inline-flex h-5 min-w-5 items-center justify-center bg-surface px-1.5 font-label text-[0.625rem] text-foreground",
        className,
      )}
      {...props}
    />
  );
}
