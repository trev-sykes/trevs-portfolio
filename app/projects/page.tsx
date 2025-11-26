// app/projects/page.tsx
import PROJECTS from "@/app/data/projects";
import ProjectCard from "@/app/components/projects/ProjectCard";
import Container from "@/app/components/ui/Container";
import SectionTitle from "@/app/components/ui/SectionTitle";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
    return (
        <Container className="py-12">
            {/* Page Header */}
            <SectionTitle
                title="All Projects"
                icon={<Sparkles className="w-6 h-6 text-pink-400" />}
                className="mb-6"
            />

            {/* Back to Home Button */}
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        techStack={project.tech}
                        liveDemo={project.liveDemo}
                        githubLink={project.github}
                    />
                ))}
            </div>
        </Container>
    );
}
