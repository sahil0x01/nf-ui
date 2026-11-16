import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/lib/cn";

export function Switch({ className, ...props }: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "nf-pixel-inset relative inline-flex h-6 w-11 shrink-0 items-center bg-surface-2 p-1",
        "data-[checked]:bg-sage disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "nf-pixel block size-4 bg-surface",
          "transition-transform duration-[var(--nf-dur-fast)] ease-[steps(3,end)] data-[checked]:translate-x-5",
        )}
      />
    </BaseSwitch.Root>
  );
}
