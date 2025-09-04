import { motion, type MotionProps } from "framer-motion";

export default function BackgroundGlows({ reduce }: { reduce: boolean }) {
  const anim = (x: number, y: number, d = 14): MotionProps =>
    reduce
      ? {}
      : {
          animate: { x, y },
          transition: {
            duration: d,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-60">
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 50%, rgba(16,185,129,.35), rgba(245,158,11,.22), transparent 70%)",
        }}
        {...anim(0, 20, 22)}
      />
      <motion.div
        className="absolute left-[10%] top-[35%] h-72 w-72 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,.35), transparent 70%)",
        }}
        {...anim(30, -20)}
      />
      <motion.div
        className="absolute right-[5%] top-[45%] h-80 w-80 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(245,158,11,.30), transparent 70%)",
        }}
        {...anim(-20, 10)}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
