"use client";
import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * 1. Wrap your app: <ToastProvider>…</ToastProvider>
 * 2. Anywhere inside: const toast = useToast(); toast.add({ title: "Saved", type: "success" })
 */
export const useToast = Toast.useToastManager;

const toastVariants = cva("nf-pixel w-80 p-3 [--nf-drop:4px] data-[starting-style]:opacity-0", {
  variants: {
    tone: {
      default: "bg-surface text-foreground",
      success: "bg-sage text-sage-foreground",
      error: "bg-danger text-danger-foreground",
      info: "bg-teal text-teal-foreground",
    },
  },
  defaultVariants: { tone: "default" },
});

function Toasts() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((t) => {
    const tone = (["success", "error", "info"].includes(String(t.type)) ? t.type : "default") as VariantProps<
      typeof toastVariants
    >["tone"];
    return (
      <Toast.Root
        key={t.id}
        toast={t}
        className={cn(
          toastVariants({ tone }),
          "transition-[opacity,transform] duration-[var(--nf-dur-base)] ease-[steps(4,end)]",
          "data-[starting-style]:translate-y-4 data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0",
        )}
      >
        <Toast.Content className="flex items-start gap-3">
          <div className="flex-1">
            <Toast.Title className="font-sans text-sm font-semibold" />
            <Toast.Description className="font-sans text-sm opacity-80" />
          </div>
          <Toast.Close aria-label="Dismiss" className="font-label text-xs opacity-70 hover:opacity-100">
            [x]
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

export function ToastProvider({ children, timeout = 4000 }: { children: React.ReactNode; timeout?: number }) {
  return (
    <Toast.Provider timeout={timeout}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3">
          <Toasts />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
