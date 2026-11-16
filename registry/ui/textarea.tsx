import * as React from "react";
import { cn } from "@/lib/cn";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "nf-pixel-inset min-h-24 w-full resize-y bg-surface px-3 py-2 font-sans text-sm text-foreground",
        "placeholder:text-subtle focus-visible:bg-background focus-visible:outline-none",
        "focus-visible:shadow-[inset_2px_2px_0_0_var(--nf-bevel-dark),-2px_0_0_0_var(--nf-accent),2px_0_0_0_var(--nf-accent),0_-2px_0_0_var(--nf-accent),0_2px_0_0_var(--nf-accent)]",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}
