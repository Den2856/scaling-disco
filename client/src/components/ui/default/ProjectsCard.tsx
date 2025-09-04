"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "./data";
import { hexToRgba } from "../hero/utils";
import useDominantColor from "./useDominantColor";

function useSmoothTilt(reduce: boolean) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const ROT = 10;
  const SHIFT = 10;

  const rx = useSpring(useTransform(py, [0, 1], [ROT, -ROT]), {
    stiffness: 180,
    damping: 20,
    mass: 0.3,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-ROT, ROT]), {
    stiffness: 180,
    damping: 20,
    mass: 0.3,
  });
  const tx = useSpring(useTransform(px, [0, 1], [SHIFT, -SHIFT]), {
    stiffness: 160,
    damping: 18,
  });
  const ty = useSpring(useTransform(py, [0, 1], [SHIFT, -SHIFT]), {
    stiffness: 160,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { rx, ry, tx, ty, onMove, onLeave };
}

export default function ProjectsCardCom({
  project,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const { rx, ry, tx, ty, onMove, onLeave } = useSmoothTilt(reduce);

  const autoGlow = useDominantColor(project.image, {
    size: 40,
    minSaturation: 0.4,
    clampLightness: [0.35, 0.6],
  });
  const glow = project.glow === "auto" ? autoGlow ?? "#10B981" : project.glow;

  const border = `conic-gradient(from 180deg at 50% 50%, ${hexToRgba(
    glow,
    0.85
  )}, ${hexToRgba(glow, 0.3)} 30%, transparent 60%, ${hexToRgba(glow, 0.85)} 100%)`;

  const appearDelay = index * 0.06;

  return (
    <motion.li
      initial={reduce ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.5, delay: appearDelay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block rounded-2xl ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        style={{
          background:
            "linear-gradient(var(--bg, #0a0a0a), var(--bg, #0a0a0a)) padding-box," +
            `${border} border-box`,
          border: "1px solid transparent",
          ["--bg" as any]: "rgba(17,17,17,0.55)",
          transition: "background 300ms ease",
        }}
      >
        {/* tilt wrapper */}
        <motion.div
          style={{
            rotateX: rx as MotionValue<number>,
            rotateY: ry as MotionValue<number>,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="rounded-2xl p-3"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            {/* image */}
            <motion.img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="h-full w-full select-none object-cover will-change-transform"
              style={{
                x: tx as MotionValue<number>,
                y: ty as MotionValue<number>,
                scale: reduce ? 1 : 1.04,
              }}
            />

            {/* overlay + title */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.Icon && (
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/50 ring-1 ring-white/10"
                        style={{ color: glow }}
                      >
                        <project.Icon size={14} />
                      </span>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-white drop-shadow-sm">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/70">{project.tag}</p>
                    </div>
                  </div>

                  {/* ВСЕГДА видимая кнопка */}
                  <motion.span
                    className="pointer-events-none inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md transition-transform group-hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(90deg, ${glow}, ${hexToRgba(glow, 0.7)})`,
                    }}
                  >
                    Visit
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* цветной glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
              style={{ background: hexToRgba(glow, 0.25) }}
            />
          </div>
        </motion.div>
      </a>
    </motion.li>
  );
}
