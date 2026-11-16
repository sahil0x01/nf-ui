import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      data-slot="input"
      className={cn(
        "nf-pixel-inset h-9 w-full bg-surface px-3 font-sans text-sm text-foreground",
        "placeholder:text-subtle focus-visible:bg-background focus-visible:outline-none",
        "focus-visible:shadow-[inset_2px_2px_0_0_var(--nf-bevel-dark),-2px_0_0_0_var(--nf-accent),2px_0_0_0_var(--nf-accent),0_-2px_0_0_var(--nf-accent),0_2px_0_0_var(--nf-accent)]",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}
