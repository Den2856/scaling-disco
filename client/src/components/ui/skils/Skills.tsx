import { useReducedMotion, motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { CATEGORIES } from "./data";
import SkillCard from "./SkillCard";

export default function Skills() {
  const reduce = (useReducedMotion() ?? false) as boolean;

  return (
    <section id="skills" className="relative">
      {/* легкая подсветка фона секции */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-40">
        <div
          className="absolute left-1/2 top-1/2 h-[180%] w-[1200px] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60 md:opacity-70"
          style={{
            background:
              "radial-gradient(60% 140% at 50% 50%, rgba(16,185,129,0.25), rgba(245,158,11,0.18) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <header className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground-h sm:text-4xl">
            Skills & Proficiency
          </h2>
          <p className="mt-3 text-foreground-l">
            A curated set of technologies I use to craft fast, animated and
            accessible experiences.
          </p>
        </header>

        {/* грид категорий */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, ci) => (
            <motion.section
              key={cat.title}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              whileInView={reduce ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, delay: ci * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <cat.Icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground-h">{cat.title}</h3>
              </div>

              <ul className="grid grid-cols-2 gap-4">
                {cat.skills.map((s, i) => (
                  <SkillCard key={s.name} skill={s} index={i} reduce={reduce} />
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}
