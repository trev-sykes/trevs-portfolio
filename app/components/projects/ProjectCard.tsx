import { ExternalLink, Github } from "lucide-react";

interface Props {
    title: string;
    description: string;
    techStack: string[];
    liveDemo: string;
    githubLink: string;
}

export default function ProjectCard({
    title,
    description,
    techStack,
    liveDemo,
    githubLink,
}: Props) {
    return (
        <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700 sm:hover:border-cyan-500 sm:hover:shadow-xl sm:hover:shadow-cyan-500/20 sm:hover:-translate-y-1 transition-all duration-300 shadow-md group w-full sm:w-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 flex items-center gap-2">
                {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tech, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono bg-gray-700 text-blue-300 rounded-full hover:bg-gray-600 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-3">
                <a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                >
                    <Github className="w-4 h-4" /> Code
                </a>
            </div>
        </div>
    );
}
