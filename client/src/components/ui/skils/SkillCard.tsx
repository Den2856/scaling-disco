import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import type { Skill } from "./data";
import { hexToRgba } from "../hero/utils";

export default function SkillCard({
  skill,
  index,
  reduce,
}: {
  skill: Skill;
  index: number;
  reduce: boolean;
}) {

  const p = useMotionValue(reduce ? skill.level : 0);
  const [pNum, setPNum] = React.useState(reduce ? skill.level : 0);

  React.useEffect(() => {
    if (reduce) return;
    const controls = animate(p, skill.level, {
      duration: 1.2,
      delay: index * 0.06,
      ease: [0.22, 0.8, 0.2, 1],
    });
    return () => controls.stop();
  }, [p, skill.level, index, reduce]);


  useMotionValueEvent(p, "change", (v) => setPNum(Math.round(v)));

  const pPct = useTransform(p, (v) => `${v}%`);
  const arc = useMotionTemplate`conic-gradient(${skill.color} ${pPct}, rgba(255,255,255,0.08) 0)`;

  return (
    <li className="group relative overflow-hidden rounded-xl bg-white/4 p-3 ring-1 ring-white/10">
      {/* мягкий цветной фон на hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 100% at 50% 30%, ${hexToRgba(
            skill.color,
            0.22
          )}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        {/* круговой индикатор */}
        <div className="relative h-14 w-14 shrink-0">
          <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: arc,
              WebkitMaskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))",
              maskImage:
                "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))",
            }}
          />
          <div className="absolute inset-[8px] grid place-items-center rounded-full bg-background/80 ring-1 ring-white/10">
            <skill.Icon size={16} style={{ color: skill.color }} />
          </div>
          <div
            aria-hidden
            className="absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity group-hover:opacity-100"
            style={{ boxShadow: `0 0 24px 2px ${hexToRgba(skill.color, 0.35)}` }}
          />
        </div>

        {/* текст */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="truncate font-medium text-foreground-h">{skill.name}</h4>
            <span className="text-xs tabular-nums text-foreground-l">{pNum}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full"
              style={{
                width: pPct,
                background: `linear-gradient(90deg, ${hexToRgba(
                  skill.color,
                  0.85
                )}, ${hexToRgba(skill.color, 0.4)})`,
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
