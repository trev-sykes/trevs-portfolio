// app/projects/page.tsx
import PROJECTS from "@/app/data/projects";
import ProjectCard from "@/app/components/projects/ProjectCard";
import Container from "@/app/components/ui/Container";
import SectionTitle from "@/app/components/ui/SectionTitle";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/footer/Footer";
export const metadata = {
    title: `Trevor's Portfolio | Projects`
}
export default function ProjectsPage() {
    // Separate projects by category
    const deepProjects = PROJECTS.filter(p => p.category === "deep");
    const otherProjects = PROJECTS.filter(p => p.category !== "deep");

    // Optional: sort by date (newest first)
    const sortByDateDesc = (a: any, b: any) => (b.date?.localeCompare(a.date || "") ?? 0);

    return (
        <>
            <Container className="py-12">
                <SectionTitle
                    title="Projects"
                    icon={<Sparkles className="w-6 h-6 text-pink-400" />}
                    className="mb-6"
                />

                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>

                <p className="text-text-muted mb-8">
                    Explore my latest creations. Deep projects are highlighted to show architecture, design, and technical depth.
                </p>

                {/* Deep Projects */}
                {deepProjects.length > 0 && (
                    <>
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Deep Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {deepProjects.sort(sortByDateDesc).map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.slug}
                                    title={project.title}
                                    logo={project?.logo}
                                    description={project.description}
                                    techStack={project.tech}
                                    liveDemo={project.liveDemo}
                                    githubLink={project.github}
                                    category={project.category}
                                    date={project.date}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                    <>
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Archived / Shallow Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherProjects.sort(sortByDateDesc).map((project) => (
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
                                    date={project.date}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
}

