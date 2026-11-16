import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

/** Pass `items={{ value: "Label" }}` so the trigger shows labels instead of raw values. */
export const Select = BaseSelect.Root;

export function SelectTrigger({
  className,
  placeholder,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger> & { placeholder?: string }) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={cn(
        "nf-pixel-inset flex h-9 w-full items-center justify-between gap-2 bg-surface px-3 font-sans text-sm text-foreground",
        "focus-visible:outline-none focus-visible:bg-background data-[popup-open]:bg-background",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <BaseSelect.Value placeholder={placeholder} />
      <BaseSelect.Icon className="text-muted">
        <PixelIcon name="chevron" size={2} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export function SelectContent({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50">
        <BaseSelect.Popup
          className={cn(
            "nf-pop nf-pixel min-w-[var(--anchor-width)] bg-surface p-1 [--nf-drop:4px]",
            className,
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex cursor-default items-center gap-2 px-2 py-1.5 font-sans text-sm outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator className="w-4">
        <PixelIcon name="check" size={1.5} />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className="-ml-4 pl-6 data-[selected]:font-semibold">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}
