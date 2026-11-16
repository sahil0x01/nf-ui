import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/cn";

export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export function DialogContent({ className, children, ...props }: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-background/70 transition-opacity duration-[var(--nf-dur-base)] ease-[steps(3,end)]",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        )}
      />
      <BaseDialog.Popup
        className={cn(
          "nf-pop nf-pixel fixed z-50 top-1/2 left-1/2 w-[min(30rem,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2",
          "bg-surface p-6 [--nf-drop:4px]",
          "data-[starting-style]:-translate-x-1/2 data-[starting-style]:-translate-y-1/2",
          "data-[ending-style]:-translate-x-1/2 data-[ending-style]:-translate-y-1/2",
          className,
        )}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn("nf-h2", className)} {...props} />;
}
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn("nf-body mt-2 text-muted", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-6 flex justify-end gap-3", className)} {...props} />;
}
