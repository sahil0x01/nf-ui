/**
 * @nullfuse/core/motion — shared motion language for the `motion` library.
 *
 * Feel: frame-by-frame, like sprite animation.
 *  - Use `steps(n)` easing so movement happens in discrete frames, never smooth curves.
 *  - Press sinks one pixel-unit; entrances are 4–5 frame pops; idle = tiny bob/hop.
 *  - Feedback ≤ 120ms, panels ≤ 240ms, entrances ≤ 400ms.
 *  - Always respect reduced motion (<MotionConfig reducedMotion="user">).
 */
import type { Transition, Variants } from "motion/react";

export const duration = {
  instant: 0.08,
  fast: 0.12,
  base: 0.24,
  slow: 0.4,
  slower: 0.7,
} as const;

/** Stepped easing: quantizes progress into `n` frames. */
export const steps = (n: number) => (t: number) => Math.min(1, Math.floor(t * n) / (n - 1 || 1));

export const ease = {
  /** 3-frame — micro feedback */
  frames3: steps(3),
  /** 5-frame — default entrance */
  frames5: steps(5),
  /** 8-frame — large moves */
  frames8: steps(8),
  linear: [0, 0, 1, 1],
} as const;

/** Prefer these over springs. A spring is only for rare "juicy" moments. */
export const spring = {
  snappy: { type: "spring", stiffness: 600, damping: 40, mass: 0.8 },
  bouncy: { type: "spring", stiffness: 380, damping: 15, mass: 0.9 },
} as const satisfies Record<string, Transition>;

export const transition = {
  fast: { duration: duration.fast, ease: ease.frames3 },
  base: { duration: duration.base, ease: ease.frames5 },
  slow: { duration: duration.slow, ease: ease.frames5 },
} as const satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

/** Pop in like a sprite appearing: scales up in 5 frames. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: transition.fast },
};

/** Slide a panel in from an edge (sheets, drawers). */
export const slideIn = (from: "left" | "right" | "top" | "bottom" = "right"): Variants => {
  const dx = from === "left" ? -32 : from === "right" ? 32 : 0;
  const dy = from === "top" ? -32 : from === "bottom" ? 32 : 0;
  return {
    hidden: { opacity: 0, x: dx, y: dy },
    visible: { opacity: 1, x: 0, y: 0, transition: transition.base },
  };
};

/** Parent variant to stagger children. */
export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Press: sink 4px (one pixel-unit) in a single frame. */
export const pressable = {
  whileTap: { y: 4, transition: { duration: duration.instant, ease: ease.frames3 } },
} as const;

/** Hop: a 4-frame jump for success / attention. `animate={hop}` */
export const hop = {
  y: [0, -12, -16, -4, 0],
  transition: { duration: 0.48, ease: ease.linear, times: [0, 0.25, 0.5, 0.75, 1] },
} as const;

export const motionDefaults = { duration, ease, spring, transition } as const;
