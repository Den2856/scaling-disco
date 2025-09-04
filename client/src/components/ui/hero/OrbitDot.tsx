import {
  motion,
  type MotionProps,
  type MotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import type { Tech } from "./stack";
import { hexToRgba } from "./utils";

export default function OrbitDot({
  angle,
  label,
  Icon,
  color,
  radius,
  rotation,
  reduce,
}: Tech & { radius: number; rotation: MotionValue<number>; reduce: boolean }) {

  const baseRad = (angle * Math.PI) / 180;
  const rotRad = useTransform(rotation, (deg) => (deg * Math.PI) / 180);
  const theta = useTransform(rotRad, (r) => r + baseRad);

  const x = useTransform(theta, (t) => radius * Math.cos(t));
  const y = useTransform(theta, (t) => radius * Math.sin(t));

  const left = useMotionTemplate`calc(50% + ${x}px)`;
  const top = useMotionTemplate`calc(50% + ${y}px)`;

  const ping: MotionProps = reduce
    ? {}
    : {
        animate: { scale: [1, 1.22, 1], opacity: [0.4, 0, 0] },
        transition: { duration: 1.6, repeat: Infinity, ease: "easeOut" },
      };

  return (
    <motion.div className="absolute" style={{ left, top, transform: "translate(-50%, -50%)" }}>
      <motion.div
        className="group relative grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-transform pointer-events-auto"
        whileHover={reduce ? {} : { scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* цветной мягкий glow = цвету иконки */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-full blur-md opacity-0 group-hover:opacity-100 transition"
          style={{
            background: `radial-gradient(60% 100% at 50% 40%, ${hexToRgba(
              color,
              0.35
            )}, transparent 70%)`,
          }}
        />

        {/* тонкий внутренний контур */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />

        {/* пульсирующее кольцо: кастомный box-shadow в цвет иконки (вместо ring-2) */}
        {!reduce && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 2px ${hexToRgba(color, 0.5)}` }}
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ opacity: 1 }}
            {...ping}
          />
        )}

        {/* сама иконка — тем же цветом */}
        <span className="relative z-10" style={{ color }}>
          <Icon size={18} />
        </span>

        {/* тултип */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileHover={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/8 px-2 py-1 text-xs text-foreground-h ring-1 ring-white/10 backdrop-blur"
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
