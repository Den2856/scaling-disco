import React, { useEffect, useRef, useState } from "react";
import { Atom, Send, Github, MessageSquare, Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };
const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Commercial", href: "#commercial"},
  { label: "Projects", href: "#projects" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const overlayRef = useRef<HTMLButtonElement | null>(null);

  // закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* мягкая световая полоса за хедером */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24">
        <div
          className="absolute left-1/2 top-1/2 h-[180%] w-[1200px] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60 md:opacity-70"
          style={{
            background:
              "radial-gradient(60% 140% at 50% 50%, rgba(16,185,129,0.35), rgba(245,158,11,0.22) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* рамка */}
      <div className="mx-auto mt-2 w-[94%] max-w-7xl rounded-2xl p-[1px] bg-gradient-to-r from-primary/50 via-accent/40 to-primary/50 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="relative grid grid-cols-[auto,1fr,auto] items-center rounded-2xl bg-background/80 ring-1 ring-outline-default/25 px-3 sm:px-4 h-14 sm:h-16">
          {/* brand */}
          <a href="/" className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center">
              <span className="absolute inset-0 rounded-xl bg-primary/25 blur-[6px]" />
              <Atom className="relative h-5 w-5 text-primary" aria-hidden />
            </span>
            <span className="hidden sm:inline font-semibold tracking-tight text-foreground-h">
              Web <span className="text-primary">Dev</span>
            </span>
          </a>

          {/* центр: «пилюля» — идеально ровные овалы через before */}
          <div className="hidden min-w-0 justify-center md:flex">
            <nav className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 outline outline-1 -outline-offset-1 outline-white/10">
              {NAV.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActive(i)}
                  data-selected={i === active}
                  className={[
                    "group relative z-0 rounded-full px-5 py-2 text-sm font-semibold",
                    "text-foreground-h hover:text-foreground-l transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    // основной «стеклянный» слой (ровный овал, внутри контур)
                    "before:content-[''] before:absolute before:inset-0 before:rounded-full",
                    "before:bg-[linear-gradient(135deg,rgba(16,185,129,.22),rgba(245,158,11,.18))]",
                    "before:shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]",
                    "before:opacity-0 hover:before:opacity-100 data-[selected=true]:before:opacity-100",
                    "before:transition-all before:duration-300",
                    // мягкое внешнее свечение
                    "after:content-[''] after:absolute after:rounded-full after:-inset-2",
                    "after:bg-[radial-gradient(60%_100%_at_50%_0%,rgba(16,185,129,.28),rgba(245,158,11,.18)_60%,transparent_70%)]",
                    "after:blur-md after:opacity-0 hover:after:opacity-100 data-[selected=true]:after:opacity-100",
                    "after:transition-opacity after:duration-300",

                  ].join(" ")}
                >
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* справа: иконки (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <IconBtn href="https://t.me//De2854" label="Contact">
              <Send className="h-4 w-4" />
            </IconBtn>
            <IconBtn href="https://github.com/Den2856" label="GitHub">
              <Github className="h-4 w-4" />
            </IconBtn>
            <IconBtn href="https://discord.com/" label="Discord">
              <MessageSquare className="h-4 w-4" />
            </IconBtn>
          </div>

          {/* бургер (mobile) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex items-center justify-center rounded-lg p-2 md:hidden ring-1 ring-outline-default/30 text-foreground-h"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* overlay без blur/трансформов — никаких «сеток» */}
          {open && (
            <button
              ref={overlayRef}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
          )}

          {/* мобильная панель: без transform, только opacity + max-height */}
          <div
            className={[
              "absolute left-2 right-2 top-[calc(100%+8px)] z-50 md:hidden",
              open ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
          >
            <div
              className={[
                "rounded-2xl bg-background/95 ring-1 ring-white/10",
                "transition-[opacity,max-height] duration-200 overflow-hidden",
                open ? "opacity-100 max-h-96" : "opacity-0 max-h-0",
              ].join(" ")}
            >
              <div className="p-2">
                {NAV.map((item, i) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "block rounded-xl px-3 py-2 text-base",
                      i === active
                        ? "text-foreground-h bg-white/6"
                        : "text-foreground-h/90 hover:bg-white/6 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="mt-2 grid grid-cols-3 gap-2">
                  <IconBtn href="https://t.me//De2854" label="Contact" full>
                    <Send className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn href="https://github.com/Den2856"  label="GitHub" full>
                    <Github className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn href="https://discord.com/" label="Discord" full>
                    <MessageSquare className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </header>
  );
}

function IconBtn({
  href,
  label,
  children,
  full = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      className={[
        "group inline-flex items-center justify-center rounded-full",
        full ? "flex-1 px-3 py-2" : "h-9 w-9",
        "bg-white/5 outline outline-1 -outline-offset-1 outline-white/10",
        "transition-colors hover:bg-white/7",
      ].join(" ")}
    >
      <span className="relative">
        <span className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur group-hover:opacity-100 transition" />
        <span className="relative text-foreground-h/90 group-hover:text-foreground-h">
          {children}
        </span>
      </span>
    </a>
  );
}
