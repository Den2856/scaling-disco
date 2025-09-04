import type { IconType } from "react-icons";
import { SiJavascript, SiNextdotjs, SiReact} from "react-icons/si";

export type Project = {
  id: number;
  title: string;
  tag: string;
  image: string;
  url: string;
  glow: string | "auto";
  Icon?: IconType;
};

export const PROJECTS: Project[] = [

    {
    id: 12,
    title: "CarHub",
    tag: "Catalog / Auto",
    image: "/projects/12.png",
    url: "https://solid-guacamole-blond.vercel.app/",
    glow: "auto",
    Icon: SiNextdotjs
  },
  {
    id: 13,
    title: "Brainwave",
    tag: "AI / Landing",
    image: "/projects/13.png",
    url: "https://miniature-guide-qoji.vercel.app/",
    glow: "auto",
    Icon: SiReact
  },
  {
    id: 2,
    title: "Grow",
    tag: "Landing / Nature",
    image: "/projects/2.png",
    url: "https://den2856.github.io/cuddly-potato/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 3,
    title: "Freight Transport",
    tag: "Corporate / Services",
    image: "/projects/3.png",
    url: "https://den2856.github.io/verbose-train/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 4,
    title: "Aperture Studio",
    tag: "Portfolio / Photo",
    image: "/projects/4.png",
    url: "https://den2856.github.io/fuzzy-fishstick/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 5,
    title: "Travel Guide",
    tag: "Blog / Travel",
    image: "/projects/5.png",
    url: "https://den2856.github.io/turbo-waffle/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 6,
    title: "Wave Surf School",
    tag: "Education / School",
    image: "/projects/6.png",
    url: "https://den2856.github.io/legendary-lamp/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 7,
    title: "Good Food",
    tag: "Restaurant / Food",
    image: "/projects/7.png",
    url: "https://den2856.github.io/ideal-meme/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 8,
    title: "Yota Mobile",
    tag: "Telecom / Pricing",
    image: "/projects/8.png",
    url: "https://den2856.github.io/improved-sniffle/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 9,
    title: "Renovation Services",
    tag: "Services / Construction",
    image: "/projects/9.png",
    url: "https://den2856.github.io/ideal-spoon/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 10,
    title: "Architecture Studio",
    tag: "Portfolio / Studio",
    image: "/projects/10.png",
    url: "https://den2856.github.io/bug-free-adventure/public/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
  {
    id: 11,
    title: "Loki — Watch Online",
    tag: "Media / Blog",
    image: "/projects/11.png",
    url: "https://den2856.github.io/shiny-memory/public/templates/blog/index.html",
    glow: "auto",
    Icon: SiJavascript
  },
];
