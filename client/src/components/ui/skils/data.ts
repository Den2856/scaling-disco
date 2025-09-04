import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
  SiVite,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiJest,
  SiTestinglibrary,
  SiDocker,
  SiGit,
} from "react-icons/si";

export type Skill = {
  name: string;
  Icon: IconType;
  color: string;
  level: number;
};

export type Category = {
  title: string;
  Icon: IconType;
  skills: Skill[];
};

export const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    Icon: SiReact,
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB", level: 75 },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 65 },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8", level: 94 },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF", level: 76 },
      { name: "HTML5", Icon: SiHtml5, color: "#764ABC", level: 98 },
      { name: "CSS3", Icon: SiCss3, color: "#2161B2", level: 98 },

    ],
  },
  {
    title: "Backend",
    Icon: SiNodedotjs,
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#3C873A", level: 59 },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#316192", level: 68 },
      { name: "JavaScript", Icon: SiJavascript, color: "#F0DC4E", level: 78 },
      { name: "MongoDB", Icon: SiMongodb, color: "#11AA52", level: 90 },
      { name: "Prisma", Icon: SiPrisma, color: "#2D3748", level: 62 },
    ],
  },
  {
    title: "Tooling & QA",
    Icon: SiVite,
    skills: [
      { name: "Vite", Icon: SiVite, color: "#A545FF", level: 100 },
      { name: "Jest", Icon: SiJest, color: "#C21325", level: 50 },
      { name: "RTL", Icon: SiTestinglibrary, color: "#E44D26", level: 40 },
      { name: "Docker", Icon: SiDocker, color: "#2496ED", level: 68 },
      { name: "Git", Icon: SiGit, color: "#F14E32", level: 88 },
    ],
  },
];
