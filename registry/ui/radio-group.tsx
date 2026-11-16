import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/lib/cn";

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof BaseRadioGroup>) {
  return <BaseRadioGroup className={cn("flex flex-col gap-2", className)} {...props} />;
}

/** Square pixel "radio" with an inner filled block when selected. */
export function RadioItem({ className, ...props }: React.ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      data-slot="radio"
      className={cn(
        "nf-pixel-inset flex size-5 shrink-0 items-center justify-center bg-surface",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="size-2.5 bg-accent data-[unchecked]:hidden" />
    </Radio.Root>
  );
}
