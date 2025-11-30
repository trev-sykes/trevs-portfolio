// app/blogs/page.tsx
import Link from "next/link";
import { Flame, ArrowLeft } from "lucide-react";
import BLOGS from "@/app/data/blogs";
import Container from "@/app/components/ui/Container";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Footer from "../components/footer/Footer";

export default function BlogsPage() {
    return (
        <>
            <Container className="py-12">
                {/* Page Header */}
                <SectionTitle
                    title="All Blogs"
                    icon={<Flame className="w-6 h-6 text-accent-cyan" />}
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

                {/* Description */}
                <p className="text-text-muted mb-8">
                    Explore my latest learnings and coding adventures. Click a blog to dive deeper!
                </p>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </Container>
            <Footer />
        </>
    );
}