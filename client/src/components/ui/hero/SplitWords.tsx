import { motion } from "framer-motion";
import { word } from "./variants";

export function SplitWords({ text, highlightIndex = 1 }: { text: string; highlightIndex?: number }) {
  return (
    <span className="inline-block">
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={word}
          initial="hidden"
          animate="visible"
          className="relative mr-2 inline-block"
        >
          <span className="relative z-10">{w}</span>
          {i === highlightIndex && (
            <span
              aria-hidden
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/15 to-accent/15 blur"
            />
          )}
        </motion.span>
      ))}
    </span>
  );
}
