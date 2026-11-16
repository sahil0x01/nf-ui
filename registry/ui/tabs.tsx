import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/cn";

export const Tabs = BaseTabs.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof BaseTabs.List>) {
  return <BaseTabs.List className={cn("flex items-end gap-2", className)} {...props} />;
}

/** Folder-style tabs: the active one is raised and filled. */
export function TabsTab({ className, ...props }: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        "nf-pixel-flat bg-surface-2 px-3 py-1.5 font-sans text-sm font-medium text-muted",
        "hover:text-foreground data-[active]:-translate-y-0.5 data-[active]:bg-sun data-[active]:text-sun-foreground",
        "transition-transform duration-[var(--nf-dur-fast)] ease-[steps(2,end)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn("pt-5 animate-fade-up", className)} {...props} />;
}
