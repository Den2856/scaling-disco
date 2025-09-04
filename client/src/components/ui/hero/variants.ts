import type { Variants } from "framer-motion";

export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const container: (delay?: number) => Variants = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.4, ease: EASE },
  },
});

export const word: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.08 * i, type: "spring", stiffness: 300, damping: 24 },
  }),
};
