"use client"
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface Props {
    id: number | string;
    title: string;
    description: string;
    techStack: string[];
    liveDemo: string;
    githubLink: string;
}

export default function ProjectCard({
    id,
    title,
    description,
    techStack,
    liveDemo,
    githubLink,
}: Props) {
    return (
        <div
            className={`
        bg-surface-dark p-4 sm:p-5 rounded-lg border border-border-dark
        sm:hover:border-accent-cyan sm:hover:shadow-xl sm:hover:shadow-accent-cyan/20
        sm:hover:-translate-y-1 transition-all duration-300 shadow-md group w-full sm:w-auto
        relative cursor-pointer
    `}
        >
            {/* Clickable overlay - entire card links to project detail */}
            <Link
                href={`/projects/${id}`}
                className="absolute inset-0 z-10 rounded-lg"
                aria-label={`View ${title} details`}
            />

            <h3
                className={`
            text-lg sm:text-xl font-semibold text-text mb-2
            group-hover:text-accent-blue-light flex items-center gap-2
            relative
        `}
            >
                {title}
            </h3>

            <p className="text-xs sm:text-sm text-text-muted mb-4 relative">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4 relative">
                {techStack.map((tech, i) => (
                    <span
                        key={i}
                        className={`
                    px-3 py-1 text-xs font-mono
                    bg-surface-dark border border-border-dark
                    text-accent-blue-light rounded-full
                    hover:bg-accent-cyan-light/20 transition-colors
                `}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Links with higher z-index to be clickable over the card overlay */}
            <div className="flex flex-wrap gap-3 relative">
                <a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`
                flex items-center gap-1 text-sm sm:text-base
                text-accent-blue-light hover:text-accent-cyan-light transition-colors
                relative z-20
            `}
                >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                </a>

                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`
                flex items-center gap-1 text-sm sm:text-base
                text-text-muted hover:text-text transition-colors
                relative z-20
            `}
                >
                    <Github className="w-4 h-4" /> Code
                </a>
            </div>
        </div>
    );
}