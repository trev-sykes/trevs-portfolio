// app/blogs/page.tsx
import Link from "next/link";
import { Flame, ArrowLeft } from "lucide-react";
import BLOGS from "@/app/data/blogs";
import Footer from "../components/footer/Footer";

export default function BlogsPage() {
    return (
        <>
            <section className="max-w-6xl mx-auto p-6 sm:p-8">
                <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Flame className="w-6 h-6 text-accent-cyan" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-text">Blogs</h1>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-accent-cyan hover:underline text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </header>

                <p className="text-text-muted mb-6">
                    Explore my latest learnings and coding adventures. Click a blog to dive deeper!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BLOGS.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
                            <div className="bg-surface-dark border border-border-dark rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-accent-cyan/20 hover:-translate-y-1 transition-all duration-300">
                                <h2 className="text-lg sm:text-xl font-semibold text-text mb-2 group-hover:text-accent-cyan">
                                    {blog.title}
                                </h2>
                                <p className="text-text-muted text-sm sm:text-base mb-3">{blog.excerpt}</p>
                                <span className="text-xs text-text-muted">{blog.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
