import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
  SiVite,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMongodb,
} from "react-icons/si";

export type Tech = {
  angle: number;
  label: string;
  Icon: IconType;
  color: string;
};

export const TECHS: Tech[] = [
  { angle: 0, label: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
  { angle: 30, label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { angle: 60, label: "React", Icon: SiReact, color: "#61DAFB" },
  { angle: 90, label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { angle: 120, label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { angle: 150, label: "Redux", Icon: SiRedux, color: "#764ABC" },
  { angle: 180, label: "Vite", Icon: SiVite, color: "#A545FF" },
  { angle: 210, label: "Node.js", Icon: SiNodedotjs, color: "#3C873A" },
  { angle: 240, label: "HTML", Icon: SiHtml5, color: "#E14F25" },
  { angle: 270, label: "CSS", Icon: SiCss3, color: "#2161B2" },
  { angle: 300, label: "JavaScript", Icon: SiJavascript, color: "#F0DC4E" },
  { angle: 330, label: "MongoDB", Icon: SiMongodb, color: "#11AA52" },
];
