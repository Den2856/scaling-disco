import { useReducedMotion, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectsCard";
import { PROJECTS } from "./data";

export default function Projects() {
  const reduce = (useReducedMotion() ?? false) as boolean;

  return (
    <section id="projects" className="relative">
      {/* soft section glow */}
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
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground-h sm:text-4xl">
            Pet-Projects
          </h2>
          <p className="mt-3 text-foreground-l">
            A selection of production work. Hover cards to explore motion; click to open live sites.
          </p>
        </header>

        {/* grid */}
        <motion.ul
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} reduce={reduce} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
