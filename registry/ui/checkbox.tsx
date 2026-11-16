import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

export function Checkbox({ className, ...props }: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        "nf-pixel-inset flex size-5 shrink-0 items-center justify-center bg-surface",
        "data-[checked]:bg-accent disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="text-accent-foreground data-[unchecked]:hidden">
        <PixelIcon name="check" size={1.5} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
