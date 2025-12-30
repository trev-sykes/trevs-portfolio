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
    tech: string[];
    hosting?: string[];
    category?: "deep" | "shallow" | "archived";
    date?: string; // format: YYYY-MM
}
