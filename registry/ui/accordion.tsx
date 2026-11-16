import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cn } from "@/lib/cn";
import { PixelIcon } from "@/components/ui/pixel-icon";

export function Accordion({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Root>) {
  return <BaseAccordion.Root className={cn("nf-pixel-flat bg-surface", className)} {...props} />;
}
export function AccordionItem({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={cn("border-b-2 border-ink last:border-b-0", className)} {...props} />;
}
export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-sans text-sm font-medium",
          "hover:bg-surface-2 focus-visible:outline-offset-[-4px]",
          className,
        )}
        {...props}
      >
        {children}
        <span className="group-data-[panel-open]:hidden"><PixelIcon name="plus" size={2} /></span>
        <span className="hidden group-data-[panel-open]:inline"><PixelIcon name="minus" size={2} /></span>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}
export function AccordionPanel({ className, children, ...props }: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-[var(--nf-dur-base)] ease-[steps(5,end)]",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
      )}
      {...props}
    >
      <div className={cn("nf-body px-4 pb-4 text-muted", className)}>{children}</div>
    </BaseAccordion.Panel>
  );
}
