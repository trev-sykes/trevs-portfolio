import ProjectCard from "./ProjectCard";
import { Sparkles } from "lucide-react";
import PROJECTS from "@/app/data/projects";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";

export default function FeaturedProjects() {
    const featuredProjects = PROJECTS.slice(0, 3);

    return (
        <section className="shadow-lg p-4 sm:p-6">
            <SectionTitle
                title="🚀 Featured Projects"
                icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {featuredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.slug}
                        title={project.title}
                        logo={project?.logo}
                        description={project.description}
                        techStack={project.tech}
                        liveDemo={project.liveDemo}
                        githubLink={project.github}
                        category={project?.category}
                        date={project?.date}
                    />
                ))}
            </div>

            {/* Direct link to /projects page */}
            <div className="text-center">
                <Link
                    href="/projects"
                    className={`
                        inline-flex flex-wrap justify-center items-center gap-2
                        px-4 sm:px-6 py-2 sm:py-3
                        bg-accent-blue
                        text-text rounded-full
                        hover:bg-accent-blue-light
                        transition-all font-semibold text-sm sm:text-base
                    `}
                >
                    View All Projects
                </Link>
            </div>
        </section>
    );
}