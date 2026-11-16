import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "@/lib/cn";

export function Slider({ className, ...props }: React.ComponentProps<typeof BaseSlider.Root>) {
  return (
    <BaseSlider.Root className={cn("w-full", className)} {...props}>
      <BaseSlider.Control className="flex h-6 w-full touch-none items-center select-none">
        <BaseSlider.Track className="nf-pixel-inset h-3 w-full bg-surface-2">
          <BaseSlider.Indicator className="bg-accent" />
          <BaseSlider.Thumb
            className={cn(
              "nf-pixel block size-5 bg-surface outline-none",
              "focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-4",
              "active:translate-y-0.5",
            )}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
