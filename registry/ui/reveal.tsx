"use client";
import * as React from "react";
import { motion } from "motion/react";
import { fadeUp } from "@nullfuse/core/motion";

/** Fade-up on scroll into view. Wrap any block. `delay` in seconds. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
