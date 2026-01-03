import { Skill } from "./skill";

export interface Project {
    id: number;
    slug: string;
    title: string;
    logo?: string;
    description: string;
    mobileDescription: string;
    summary?: string;
    challenges?: string;
    learnings?: string[];
    liveDemo: string;
    github: string;
    thumbnail?: string;
    tech: Skill[];
    hosting?: string[];
    category?: "deep" | "shallow" | "archived";
    date?: string; // format: YYYY-MM
}
