import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CommercialProject } from "./data";
import { hexToRgba } from "../hero/utils";
import useDominantColor from "../default/useDominantColor";

/* ==== плавный tilt/parallax без рывков ==== */
function useSmoothTilt(reduce: boolean) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const ROT = 10;
  const SHIFT = 12;

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

export default function CommercialCard({
  project,
  index,
  feature = false,
  reduce,
  className = "",
}: {
  project: CommercialProject;
  index: number;
  feature?: boolean;
  reduce: boolean;
  className?: string;
}) {
  
  const autoGlow = useDominantColor(project.image, {
    size: 48,
    minSaturation: 0.45,
    clampLightness: [0.35, 0.6],
  });
  const glow = project.glow === "auto" ? autoGlow ?? "#10B981" : project.glow;

  const { rx, ry, tx, ty, onMove, onLeave } = useSmoothTilt(reduce);

  const border = `conic-gradient(from 180deg at 50% 50%, ${hexToRgba( glow, 0.85 )}, ${hexToRgba(glow, 0.28)} 30%, transparent 60%, ${hexToRgba(glow, 0.85)} 100%)`;

  const appearDelay = index * 0.06;

  const outerCls = [
    feature ? "lg:col-span-2" : "",
    "relative overflow-hidden rounded-2xl list-none",
    className
  ].join(" ");

  return (
    <motion.li
      initial={reduce ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.55, delay: appearDelay, ease: [0.2, 0.8, 0.2, 1] }}
      className={outerCls}
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
            "linear-gradient(var(--bg, #0b0b0b), var(--bg, #0b0b0b)) padding-box," +
            `${border} border-box`,
          border: "1px solid transparent",
          transition: "background 300ms ease",
          ["--bg" as any]: "rgba(14,14,14,0.55)",
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
          <div className="relative">
            {/* изображение с параллаксом */}
            <motion.img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="h-full w-full select-none object-cover will-change-transform"
              style={{
                x: tx as MotionValue<number>,
                y: ty as MotionValue<number>,
                scale: reduce ? 1 : 1,
              }}
            />

            {/* стек (всегда видим, анимируется на hover) */}
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 p-4">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  {/* Тень для улучшенной читаемости на светлом фоне */}
                  <div className="bg-black/50 p-2 rounded-md backdrop-blur-md">
                    <h3 className="text-white font-semibold text-base sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm">{project.tag}</p>
                  </div>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((t, i) => (
                      <motion.li
                        key={t.name}
                        initial={reduce ? undefined : { opacity: 0, y: 8 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i, duration: 0.3 }}
                        className="pointer-events-auto list-none inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white ring-1 ring-white/10 backdrop-blur"
                      >
                        <t.Icon size={12} style={{ color: t.color ?? glow }} />
                        <span className="hidden sm:inline">{t.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* кнопка — всегда видна */}
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

            {/* верхний «shine» — диагональный бликовый слой */}
            <motion.div
              aria-hidden
              initial={false}
              animate={
                reduce
                  ? { opacity: 0.2 }
                  : { x: ["-30%", "130%"], opacity: [0.1, 0.25, 0.1] }
              }
              transition={
                reduce
                  ? undefined
                  : { duration: 2.6, ease: "linear", repeat: Infinity }
              }
              className="pointer-events-none absolute -inset-y-10 -left-1/3 -right-1/3 rotate-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                mixBlendMode: "screen",
              }}
            />

            {/* цветной ambient-glow при hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: hexToRgba(glow, 0.25) }}
            />
          </div>
        </motion.div>
      </a>
    </motion.li>
  );
}
