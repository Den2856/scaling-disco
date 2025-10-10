import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import CommercialCard from "./CommercialCard";
import { COMMERCIALS } from "./data";
import useDominantColor from "../default/useDominantColor";
import { hexToRgba } from "../hero/utils";


function SpotlightBackground({
  index,
  active,
  img,
  fallback = "#10B981",
}: {
  index: number;
  active: number;
  img: string;
  fallback?: string;
}) {
  const auto = useDominantColor(img, {
    size: 48,
    minSaturation: 0.45,
    clampLightness: [0.35, 0.6],
  });
  const color = auto ?? fallback;

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: index === active ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          `radial-gradient(60% 120% at 30% 30%, ${hexToRgba(color, 0.22)}, transparent 70%),` +
          `radial-gradient(60% 120% at 70% 70%, ${hexToRgba(color, 0.16)}, transparent 72%)`,
        filter: "blur(24px)",
      }}
    />
  );
}

export default function CommercialSpotlight() {
  const reduce = (useReducedMotion() ?? false) as boolean;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  
  const itemRefs = useMemo(
    () => Array.from({ length: COMMERCIALS.length }, () => React.createRef<HTMLDivElement>()),
    []
  );

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (Number.isFinite(i) && e.isIntersecting && !isScrolling) setActive(i);
        });
      },
      { root, threshold: 0.6 }
    );
    itemRefs.forEach((r) => r.current && io.observe(r.current));
    return () => io.disconnect();
  }, [itemRefs, isScrolling]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = scrollerRef.current;
    if (!el) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
    }

    el.scrollBy({ left: e.deltaY, behavior: "smooth" });
  };

  const goToSlide = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    setIsScrolling(true);
    const slide = itemRefs[index]?.current;
    if (slide) {
      const offset = slide.offsetLeft - el.offsetLeft;
      el.scrollTo({
        left: offset,
        behavior: "smooth",
      });

      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const navigate = (dir: 1 | -1) => {
    let nextIndex = active + dir;

    // Зацикливание
    if (nextIndex < 0) nextIndex = COMMERCIALS.length - 1;
    if (nextIndex >= COMMERCIALS.length) nextIndex = 0;

    goToSlide(nextIndex);
  };

  const handlePause = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleResume = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActive((prevActive) => {
        const nextActive = (prevActive + 1) % COMMERCIALS.length;
        goToSlide(nextActive);
        return nextActive;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="commercial" className="relative">
      {/* фоновая подсветка — слой под треком, кросс-фейд по активному */}
      <div className="absolute inset-0 -z-10">
        {COMMERCIALS.map((p, i) => (
          <SpotlightBackground key={p.id} index={i} active={active} img={p.image} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground-h sm:text-4xl">
            Commercial Projects — Spotlight
          </h2>
          <p className="mt-3 text-foreground-l">
            Center-focused, smooth, with dominant-color glow and snap scrolling.
          </p>
        </header>

        <div className="relative">
          {/* стрелки */}
          <div className="absolute inset-y-0 left-3 z-20 items-center hidden md:flex">
            <button
              type="button"
              onClick={() => navigate(-1)}
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-foreground-h ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-3 z-20 items-center hidden md:flex">
            <button
              type="button"
              onClick={() => navigate(1)}
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-foreground-h ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* горизонтальный трек */}
          <div
            ref={scrollerRef}
            onWheel={onWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={[
              "relative z-10 flex gap-8 overflow-x-auto pb-6",
              "snap-x snap-mandatory",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
            ].join(" ")}
          >
            {COMMERCIALS.map((p, i) => (
              <div
                key={p.id}
                ref={itemRefs[i]}
                data-index={i}
                className={[
                  "snap-center shrink-0 transition-transform duration-400",
                  i === active ? "scale-100" : "scale-[.92] opacity-90",
                ].join(" ")}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
              >
                <CommercialCard
                  project={p}
                  index={i}
                  feature={false}
                  reduce={reduce}
                  className="w-[88vw] sm:w-[70vw] lg:w-[980px]"
                />
              </div>
            ))}
          </div>

          {/* точки-индикаторы */}
          <div className="mt-6 flex justify-center gap-2">
            {COMMERCIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
                className={[
                  "h-2.5 w-2.5 rounded-full ring-1 ring-white/20 transition",
                  i === active ? "bg-foreground-h" : "bg-white/10 hover:bg-white/15",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}