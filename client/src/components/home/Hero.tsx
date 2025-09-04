import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";

import BackgroundGlows from "../ui/hero/BackgroundGlows";
import Orbit from "../ui/hero/Orbit";
import { container } from "../ui/hero/variants";
import { SplitWords } from "../ui/hero/SplitWords";

export default function Hero() {
  const reduce = (useReducedMotion() ?? false) as boolean;

  return (
    <section id="about" className="relative overflow-hidden">
      <BackgroundGlows reduce={reduce} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="relative z-10">
            <motion.div
              variants={container(0.1)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground-l"
              data-motion
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,.8)]" />
              Building modern web experiences
            </motion.div>

            <h1 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight text-foreground-h sm:text-5xl lg:text-6xl">
              <SplitWords text="Crafting Elegant Interfaces" />
            </h1>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-foreground-l">
              Full-stack developer focused on motion, performance and clean design.
              I turn product ideas into fast, accessible and animated experiences.
            </p>

            <motion.div
              variants={container(0.25)}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-3"
              data-motion
            >
              <a
                href="https://t.me//De2854"
                target="_blank"
                className={[
                  "group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-gradient-to-r from-primary to-accent text-black",
                  "shadow-[0_8px_24px_rgba(16,185,129,.25)] ring-1 ring-black/10",
                  "transition-transform will-change-transform hover:-translate-y-0.5",
                ].join(" ")}
              >
                Contact me
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#commercial"
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
                  "text-foreground-h bg-white/5 ring-1 ring-white/10 hover:bg-white/7",
                ].join(" ")}
              >
                View projects
                <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
              </a>
            </motion.div>

            <div className="mt-10 flex items-center gap-2 text-foreground-l">
              <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
              <span className="text-sm">Scroll to explore</span>
            </div>
          </div>

          {/* Right */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <Orbit reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}
