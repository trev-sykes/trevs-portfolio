import { BrandIcon } from "@/app/components/ui/BrandIcon";
import { Skill, SkillKey } from "@/app/types/skill";
import { Atom } from "lucide-react";

import {
    siReact,
    siNextdotjs,
    siTypescript,
    siTailwindcss,
    siFramer,
    siNodedotjs,
    siExpress,
    siPrisma,
    siGraphql,
    siRender,
    siVercel,
    siVite,
    siGithub,
} from "simple-icons";

const iconClass = "w-5 h-5";

export const SKILL_MAP: Record<SkillKey, Skill> = {
    react: {
        key: "react",
        name: "React",
        icon: <BrandIcon path={siReact.path} className={`${iconClass} text-cyan-400`} />,
    },
    next: {
        key: "next",
        name: "Next.js",
        icon: <BrandIcon path={siNextdotjs.path} className={`${iconClass} text-white`} />,
    },
    typescript: {
        key: "typescript",
        name: "TypeScript",
        icon: <BrandIcon path={siTypescript.path} className={`${iconClass} text-blue-400`} />,
    },
    tailwind: {
        key: "tailwind",
        name: "Tailwind CSS",
        icon: <BrandIcon path={siTailwindcss.path} className={`${iconClass} text-teal-400`} />,
    },
    framer: {
        key: "framer",
        name: "Framer Motion",
        icon: <BrandIcon path={siFramer.path} className={`${iconClass} text-pink-400`} />,
    },
    zustand: {
        key: "zustand",
        name: "Zustand",
        icon: <Atom className={`${iconClass} text-yellow-400`} />,
    },
    node: {
        key: "node",
        name: "Node.js",
        icon: <BrandIcon path={siNodedotjs.path} className={`${iconClass} text-green-400`} />,
    },
    express: {
        key: "express",
        name: "Express",
        icon: <BrandIcon path={siExpress.path} className={`${iconClass} text-gray-300`} />,
    },
    prisma: {
        key: "prisma",
        name: "Prisma",
        icon: <BrandIcon path={siPrisma.path} className={`${iconClass} text-indigo-400`} />,
    },
    graphql: {
        key: "graphql",
        name: "GraphQL",
        icon: <BrandIcon path={siGraphql.path} className={`${iconClass} text-pink-500`} />,
    },
    render: {
        key: "render",
        name: "Render",
        icon: <BrandIcon path={siRender.path} className={`${iconClass} text-sky-400`} />,
    },
    vercel: {
        key: "vercel",
        name: "Vercel",
        icon: <BrandIcon path={siVercel.path} className={`${iconClass} text-white`} />,
    },
    vite: {
        key: "vite",
        name: "Vite",
        icon: <BrandIcon path={siVite.path} className={`${iconClass} text-orange-400`} />,
    },
    github: {
        key: "github",
        name: "GitHub",
        icon: <BrandIcon path={siGithub.path} className={`${iconClass} text-gray-200`} />,
    },
};

export const SKILLS = Object.values(SKILL_MAP);
