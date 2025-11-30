import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, Sparkles } from "lucide-react";
import PROJECTS from "@/app/data/projects";
import Footer from "@/app/components/footer/Footer";

// Props type for the page
interface Props {
    params: Promise<{ id: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id.toString(),
    }));
}

export default async function ProjectDetail({ params }: Props) {
    const { id } = await params;

    const project = PROJECTS.find((p) => p.id === parseInt(id));
    if (!project) return notFound();

    // Create recommended projects (excluding current one)
    const recommended = PROJECTS.filter(p => p.id !== project.id).slice(0, 2);

    return (
        <>
            <section className="max-w-4xl mx-auto p-6 sm:p-8 min-h-screen">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="text-accent-cyan hover:underline text-sm sm:text-base flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Home
                    </Link>
                    <Link href="/projects" className="text-accent-cyan hover:underline text-sm sm:text-base">
                        See All Projects
                    </Link>
                </div>

                {/* Project Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-text">{project.title}</h1>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs font-mono bg-surface-dark border border-border-dark text-accent-blue-light rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 hover:shadow-lg hover:shadow-accent-cyan/50 transition-all"
                        >
                            <ExternalLink className="w-5 h-5" /> Live Demo
                        </a>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-dark border border-border-dark text-text font-semibold rounded-lg hover:bg-surface hover:shadow-lg transition-all"
                        >
                            <Github className="w-5 h-5" /> View Code
                        </a>
                    </div>
                </div>

                {/* Project Thumbnail */}
                <div className="mb-8 rounded-lg overflow-hidden border border-border-dark shadow-xl">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-auto"
                    />
                </div>

                {/* Project Overview */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Overview</h2>
                    <p className="text-text leading-relaxed mb-4">
                        {project.description}
                    </p>
                </div>

                {/* Key Features Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Key Features</h2>
                    <ul className="space-y-3 text-text">
                        <li className="flex items-start gap-3">
                            <span className="text-accent-green mt-1">✓</span>
                            <span>Built with modern technologies: {project.tech.slice(0, 3).join(", ")}</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent-green mt-1">✓</span>
                            <span>Responsive design optimized for all devices</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent-green mt-1">✓</span>
                            <span>Production-ready deployment on Vercel</span>
                        </li>
                    </ul>
                </div>

                {/* Technical Highlights */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Technical Highlights</h2>
                    <div className="bg-surface-dark border border-border-dark rounded-lg p-6">
                        <p className="text-text-muted mb-4">
                            This project showcases {project.tech.join(", ")} working together to create a seamless user experience.
                            The architecture emphasizes modern best practices, type safety, and performance optimization.
                        </p>
                        <div className="bg-bg border border-border-dark rounded p-4">
                            <p className="text-accent-blue-light text-sm mb-2">Tech Stack:</p>
                            <ul className="list-disc list-inside text-text-muted text-sm space-y-1">
                                {project.tech.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* YOU MAY ALSO LIKE SECTION */}
                {recommended.length > 0 && (
                    <div className="mt-14">
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4 flex items-center gap-2">
                            <Sparkles className="w-6 h-6" />
                            You may also like
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {recommended.map((rec) => (
                                <Link
                                    key={rec.id}
                                    href={`/projects/${rec.id}`}
                                    className="group bg-surface-dark border border-border-dark rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-accent-cyan/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-text group-hover:text-accent-cyan mb-1">
                                        {rec.title}
                                    </h3>
                                    <p className="text-text-muted text-sm mb-3">{rec.mobileDescription}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {rec.tech.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-bg rounded text-accent-blue-light">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}