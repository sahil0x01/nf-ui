import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

/**
 * Searchable select. Pass `items` (string[] or {value,label}[]) to the root;
 * Base UI filters them as you type.
 *
 *   <Combobox items={["Next", "Remix", "Astro"]}>
 *     <ComboboxInput placeholder="Search…" />
 *     <ComboboxContent>
 *       <ComboboxEmpty>No matches.</ComboboxEmpty>
 *       <ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList>
 *     </ComboboxContent>
 *   </Combobox>
 */
export const Combobox = BaseCombobox.Root;

export function ComboboxInput({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Input>) {
  return (
    <div className="relative">
      <BaseCombobox.Input
        data-slot="combobox-input"
        className={cn(
          "nf-pixel-inset h-9 w-full bg-surface pr-9 pl-3 font-sans text-sm text-foreground",
          "placeholder:text-subtle focus-visible:bg-background focus-visible:outline-none",
          "focus-visible:shadow-[inset_2px_2px_0_0_var(--nf-bevel-dark),-2px_0_0_0_var(--nf-accent),2px_0_0_0_var(--nf-accent),0_-2px_0_0_var(--nf-accent),0_2px_0_0_var(--nf-accent)]",
          "disabled:cursor-not-allowed disabled:opacity-45",
          className,
        )}
        {...props}
      />
      <BaseCombobox.Trigger
        aria-label="Open options"
        className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-foreground"
      >
        <PixelIcon name="chevron" size={2} />
      </BaseCombobox.Trigger>
    </div>
  );
}

export function ComboboxContent({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Popup>) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={6} className="z-50">
        <BaseCombobox.Popup
          className={cn(
            "nf-pop nf-pixel w-[var(--anchor-width)] bg-surface p-1 outline-none [--nf-drop:4px]",
            className,
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export function ComboboxList({ className, ...props }: React.ComponentProps<typeof BaseCombobox.List>) {
  return <BaseCombobox.List className={cn("max-h-64 overflow-y-auto", className)} {...props} />;
}

export function ComboboxItem({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      className={cn(
        "flex cursor-default items-center gap-2 px-2 py-1.5 font-sans text-sm outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <BaseCombobox.ItemIndicator className="w-4">
        <PixelIcon name="check" size={1.5} />
      </BaseCombobox.ItemIndicator>
      <span className="-ml-4 pl-6">{children}</span>
    </BaseCombobox.Item>
  );
}

export function ComboboxEmpty({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      className={cn("nf-small px-3 py-4 text-center empty:hidden", className)}
      {...props}
    />
  );
}
