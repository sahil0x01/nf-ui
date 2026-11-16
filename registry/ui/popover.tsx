import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "@/lib/cn";

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

export function PopoverContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & { sideOffset?: number }) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} className="z-50">
        <BasePopover.Popup
          className={cn("nf-pop nf-pixel w-72 bg-surface p-4 [--nf-drop:4px]", className)}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
export function PopoverTitle({ className, ...props }: React.ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title className={cn("nf-h4", className)} {...props} />;
}
export function PopoverDescription({ className, ...props }: React.ComponentProps<typeof BasePopover.Description>) {
  return <BasePopover.Description className={cn("nf-small mt-1", className)} {...props} />;
}
