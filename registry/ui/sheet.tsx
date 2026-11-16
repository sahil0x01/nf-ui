import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const Sheet = BaseDialog.Root;
export const SheetTrigger = BaseDialog.Trigger;
export const SheetClose = BaseDialog.Close;

const sheetVariants = cva(
  [
    "fixed z-50 bg-surface p-6 outline-none",
    "transition-transform duration-[var(--nf-dur-base)] ease-[steps(5,end)]",
  ],
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 w-[min(24rem,90vw)] border-l-2 border-ink data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
        left:
          "inset-y-0 left-0 w-[min(24rem,90vw)] border-r-2 border-ink data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
        bottom:
          "inset-x-0 bottom-0 max-h-[80vh] border-t-2 border-ink data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
      },
    },
    defaultVariants: { side: "right" },
  },
);

/** Edge-anchored panel. Slides in over 5 frames. */
export function SheetContent({
  className,
  side,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup> & VariantProps<typeof sheetVariants>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-background/70 transition-opacity duration-[var(--nf-dur-base)] ease-[steps(3,end)]",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        )}
      />
      <BaseDialog.Popup className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}
export function SheetTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn("nf-h2", className)} {...props} />;
}
export function SheetDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn("nf-body mt-2 text-muted", className)} {...props} />;
}
