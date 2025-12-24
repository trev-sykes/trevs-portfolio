export interface Project {
    id: number;
    slug: string;
    title: string;
    description: string;
    mobileDescription: string;
    liveDemo: string;
    github: string;
    thumbnail?: string;
    tech: string[];
    hosting?: string[];
}
