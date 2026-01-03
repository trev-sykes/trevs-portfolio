import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, Sparkles } from "lucide-react";
import PROJECTS from "@/app/data/projects";
import Footer from "@/app/components/footer/Footer";
import Image from "next/image";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.slug === id);
    if (!project) return { title: "Project Not Found – Trevor's Portfolio" };

    return {
        title: `${project.title} – Trevor's Portfolio`,
        description: project.description,
    };
}

export default async function ProjectDetail({ params }: Props) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.slug === id);
    if (!project) return notFound();

    const otherProjects = PROJECTS.filter((p) => p.slug !== id);
    for (let i = otherProjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherProjects[i], otherProjects[j]] = [otherProjects[j], otherProjects[i]];
    }
    const recommended = otherProjects.slice(0, 2);

    // Dynamically generate Key Features
    const keyFeatures = [
        `Built with modern technologies: ${project.tech.slice(0, 3).join(", ")}`,
        "Responsive design optimized for all devices",
        project.hosting ? `Deployed on: ${project.hosting.join(", ")}` : null,
        project.summary ? "Well-planned architecture and data modeling" : null,
        project.learnings && project.learnings.length > 0 ? "Notable learnings applied in development" : null,
    ].filter(Boolean);

    return (
        <>
            <section className="max-w-4xl mx-auto p-6 sm:p-8 min-h-screen">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/"
                        className="text-accent-cyan hover:underline text-sm sm:text-base flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Home
                    </Link>
                    <Link
                        href="/projects"
                        className="text-accent-cyan hover:underline text-sm sm:text-base"
                    >
                        See All Projects
                    </Link>
                </div>

                {/* Project Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-text flex items-center gap-3">
                        {/* Optional Logo */}
                        {project.logo && (
                            <img
                                src={project.logo}
                                alt={`${project.title} logo`}
                                className="w-10 h-10 object-contain rounded-md"
                            />
                        )}

                        {project.title}
                    </h1>

                    {/* Category & Date Badge */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.category && (
                            <span
                                className={`
                px-3 py-1 text-xs font-mono rounded-full
                ${project.category === "deep"
                                        ? "bg-accent-cyan text-bg"
                                        : project.category === "shallow"
                                            ? "bg-accent-blue text-bg"
                                            : "bg-accent-red text-bg"
                                    }
            `}
                            >
                                {project.category.toUpperCase()}
                            </span>
                        )}

                        {project.date && (
                            <span className="px-3 py-1 text-xs font-mono bg-surface-dark text-text rounded-full">
                                Completed: {project.date}
                            </span>
                        )}
                    </div>


                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map((tech) => (
                            <div
                                key={tech.key}
                                className="p-2 bg-surface-dark border border-border-dark rounded-lg 
                       hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all flex items-center justify-center"
                                title={tech.name}
                                role="img"
                                aria-label={tech.name}
                            >
                                {tech.icon}
                            </div>
                        ))}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
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
                {project.thumbnail && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-border-dark shadow-xl relative w-full aspect-[16/9] sm:aspect-[4/3]">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAFklEQVR42mNk+M+ACDAwMDAwAAPnAAB9+9qQAAAAAElFTkSuQmCC"
                            priority={true}
                        />
                    </div>
                )}


                {/* Overview */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Overview</h2>
                    <p className="text-text leading-relaxed">{project.description}</p>
                </div>

                {/* Deep Dive Sections */}
                {project.summary && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Summary</h2>
                        <p className="text-text leading-relaxed">{project.summary}</p>
                    </div>
                )}

                {project.challenges && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Challenges</h2>
                        <p className="text-text leading-relaxed">{project.challenges}</p>
                    </div>
                )}

                {project.learnings && project.learnings.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Key Learnings</h2>
                        <ul className="list-disc list-inside text-text space-y-2">
                            {project.learnings.map((learning, i) => (
                                <li key={i}>{learning}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Key Features (Dynamic) */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Key Features</h2>
                    <ul className="space-y-3 text-text">
                        {keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-accent-green mt-1">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Technical Highlights */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Technical Highlights</h2>
                    <div className="bg-surface-dark border border-border-dark rounded-lg p-6">
                        <p className="text-text-muted mb-4">
                            This project demonstrates how {project.tech.join(", ")} work together to create a seamless, high-performance user experience.
                        </p>
                        {project.summary && (
                            <p className="text-text-muted mb-4">
                                Key architectural and design choices include: {project.summary}
                            </p>
                        )}
                        {project.learnings && project.learnings.length > 0 && (
                            <p className="text-text-muted mb-4">
                                Lessons applied from development include: {project.learnings.join(", ")}
                            </p>
                        )}
                        <div className="bg-bg border border-border-dark rounded p-4">
                            <p className="text-accent-blue-light text-sm mb-2">Tech Stack:</p>
                            <ul className="list-disc list-inside text-text-muted text-sm space-y-1">
                                {project.tech.map((tech) => (
                                    <li key={tech.key}>{tech.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Recommended Projects */}
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
                                    href={`/projects/${rec.slug}`}
                                    className="group bg-surface-dark border border-border-dark rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-accent-cyan/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-text group-hover:text-accent-cyan mb-1">
                                        {rec.title}
                                    </h3>
                                    <p className="text-text-muted text-sm mb-3">{rec.mobileDescription}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {rec.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech.key}
                                                className="text-xs px-2 py-1 bg-bg rounded text-accent-blue-light"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                        {rec.hosting?.map((host, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-bg rounded text-accent-cyan">
                                                {host}
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
