import * as React from "react";

/** Tiny pathname router (History API). No dependency. */
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
};
const getPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

export function usePath() {
  return React.useSyncExternalStore(subscribe, getPath, () => "/");
}

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState(null, "", to);
  listeners.forEach((l) => l());
}

export function Link({
  href,
  onClick,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        const external = /^(https?:)?\/\//.test(href) || props.target === "_blank";
        if (e.defaultPrevented || external || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (href.startsWith("#")) return; // in-page anchor: let the browser handle it
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
