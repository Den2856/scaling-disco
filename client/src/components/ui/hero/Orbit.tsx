import React from "react";
import { animate, useMotionValue } from "framer-motion";
import { Code2 } from "lucide-react";
import useElementSize from "./useElementSize";
import { TECHS } from "./stack";
import OrbitDot from "./OrbitDot";

export default function Orbit({ reduce }: { reduce: boolean }) {
  
  const { ref: wrapRef, size } = useElementSize<HTMLDivElement>();
  const RING_THICK = 1;
  const base = Math.min(size.w, size.h);
  const radius = Math.max(0, base / 2 - RING_THICK / 2);

  const rotation = useMotionValue(0);
  React.useEffect(() => {
    if (reduce) return;
    const controls = animate(rotation, 360, {
      duration: 50,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduce, rotation]);

  return (
    <div ref={wrapRef} className="relative -z-50 h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]">
      {/* ядро */}
      <div className="absolute inset-0 -z-50 grid place-items-center">
        <div className="relative h-28 w-28 rounded-2xl bg-white/5 ring-1 ring-white/10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/25 to-accent/25 blur-xl" />
          <div className="relative -z-50 grid h-full w-full place-items-center">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* планеты */}
      <div className="absolute inset-0 -z-50">
        {TECHS.map((t) => (
          <OrbitDot key={t.label} {...t} radius={radius} rotation={rotation} reduce={reduce} />
        ))}
      </div>

      {/* кольцо — ниже и без перехвата мыши */}
      <div className="pointer-events-none absolute inset-0 -z-50 rounded-full ring-1 ring-white/10" />
    </div>
  );
}
