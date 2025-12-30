"use client"
import { ExternalLink, Github } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    id: number | string;
    title: string;
    description: string;
    techStack: string[];
    liveDemo: string;
    githubLink: string;
    logo?: string;
    date?: string;
    category?: "deep" | "shallow" | "archived";
}

const categoryColors: Record<NonNullable<Props["category"]>, string> = {
    deep: "bg-accent-cyan/20 text-accent-cyan",
    shallow: "bg-accent-blue/20 text-accent-blue",
    archived: "bg-accent-red/20 text-accent-red",
};

export default function ProjectCard({
    id,
    title,
    description,
    techStack,
    liveDemo,
    githubLink,
    logo,
    date,
    category,
}: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/projects/${id}`)}
            className={`
                group relative w-full sm:w-auto cursor-pointer
                bg-surface-dark p-4 sm:p-5 rounded-lg border border-border-dark
                sm:hover:border-accent-cyan sm:hover:shadow-xl sm:hover:shadow-accent-cyan/20
                sm:hover:-translate-y-1 transition-all duration-300 shadow-md
                flex flex-col justify-between
            `}
        >
            {/* Top content */}
            <div>
                {/* Subtle Category Badge */}
                {category && (
                    <span
                        className={`
                            absolute top-2 right-2 text-[0.625rem] font-mono px-2 py-0.5
                            rounded-md shadow-sm ${categoryColors[category]}
                            pointer-events-none
                        `}
                    >
                        {category.toUpperCase()}
                    </span>
                )}

                <h3 className="text-lg sm:text-xl font-semibold text-text mb-2 flex items-center gap-2">
                    {logo && (
                        <img
                            src={logo}
                            alt={`${title} logo`}
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-md"
                        />
                    )}
                    {title}
                </h3>
                {/* Date */}
                {date && <p className="text-xs text-text-muted mt-1 mb-4">Completed: {date}</p>}
                <p className="text-xs sm:text-sm text-text-muted mb-4">{description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {techStack.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono bg-surface-dark border border-border-dark text-accent-blue-light rounded-full hover:bg-accent-cyan-light/20 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom content */}
            <div className="mt-4 flex flex-col gap-2">
                {/* External Links */}
                <div className="flex flex-wrap gap-3">
                    <a
                        href={liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-sm sm:text-base text-accent-blue-light hover:text-accent-cyan-light transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>

                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-sm sm:text-base text-text-muted hover:text-text transition-colors"
                    >
                        <Github className="w-4 h-4" /> Code
                    </a>
                </div>
            </div>
        </div>
    );
}
