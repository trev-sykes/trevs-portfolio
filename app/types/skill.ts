export type SkillKey =
    | "react"
    | "next"
    | "typescript"
    | "tailwind"
    | "framer"
    | "zustand"
    | "node"
    | "express"
    | "prisma"
    | "graphql"
    | "render"
    | "vercel"
    | "vite"
    | "github";

export interface Skill {
    key: SkillKey;
    name: string;
    icon: React.ReactNode;
}
