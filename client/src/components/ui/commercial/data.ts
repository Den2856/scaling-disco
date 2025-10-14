import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

export type TechBadge = { name: string; Icon: IconType; color?: string };

export type CommercialProject = {
  id: number;
  title: string;
  tag: string;
  image: string;
  url: string;
  glow: string | "auto";
  stack: TechBadge[]; 
};

export const COMMERCIALS: CommercialProject[] = [
    {
    id: 14,
    title: "Tripsy",
    tag: "Web App / Dashboard",
    image: "/comercial/2.png",
    url: "https://reimagined-octo-sniffle-chi.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 19,
    title: "Cinema",
    tag: "Web App / Theathers",
    image: "/comercial/7.png",
    url: "https://sturdy-octo-happiness-seven.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 16,
    title: "Planto",
    tag: "Brand / Creative",
    image: "/comercial/4.png",
    url: "https://special-guacamole-theta.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 15,
    title: "EV Voltage",
    tag: "E-commerce UI",
    image: "/comercial/3.png",
    url: "https://refactored-garbanzo-one.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 20,
    title: "Positivus",
    tag: "Analitics / Marketing",
    image: "/comercial/8.png",
    url: "https://effective-octo-waffle-zeta.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 18,
    title: "Dashboard",
    tag: "Analitics / Marketing",
    image: "/comercial/6.png",
    url: "https://stunning-rotary-phone.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 17,
    title: "Weather Now",
    tag: "Product / Fintech",
    image: "/comercial/5.png",
    url: "https://fuzzy-memory-9129.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 20,
    title: "XTRAPP",
    tag: "Analitics / Marketing",
    image: "/comercial/9.png",
    url: "https://redesigned-spoon-azure.vercel.app/",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: 1,
    title: "Jadoo Travel",
    tag: "Landing / Marketing",
    image: "/comercial/1.png",
    url: "https://den2856.github.io/legendary-palm-tree/jadoo/public/index.html",
    glow: "auto",
    stack: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
];
