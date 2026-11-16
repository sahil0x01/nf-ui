import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "@/lib/cn";

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;

export function MenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & { sideOffset?: number }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} className="z-50">
        <BaseMenu.Popup
          className={cn("nf-pop nf-pixel min-w-44 bg-surface p-1 outline-none [--nf-drop:4px]", className)}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuItem({ className, ...props }: React.ComponentProps<typeof BaseMenu.Item>) {
  return (
    <BaseMenu.Item
      className={cn(
        "flex cursor-default items-center justify-between gap-6 px-2 py-1.5 font-sans text-sm outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

export function MenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("nf-label px-2 py-1.5", className)} {...props} />;
}
export function MenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="separator" className={cn("my-1 h-0.5 bg-border", className)} {...props} />;
}
