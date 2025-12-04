export interface Project {
    id: number;
    title: string;
    description: string;
    mobileDescription: string;
    liveDemo: string;
    github: string;
    thumbnail?: string;
    tech: string[];
    hosting?: string[];
}
