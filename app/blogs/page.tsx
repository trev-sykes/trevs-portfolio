"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Flame, ArrowLeft, X } from "lucide-react";
import BLOGS from "@/app/data/blogs";
import Container from "@/app/components/ui/Container";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Footer from "../components/footer/Footer";

export default function BlogsPage() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        BLOGS.forEach(blog => blog.tags.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet).sort();
    }, []);

    // Filter blogs based on selected tag
    const filteredBlogs = useMemo(() => {
        if (!selectedTag) return BLOGS;
        return BLOGS.filter(blog => blog.tags.includes(selectedTag));
    }, [selectedTag]);

    return (
        <>
            <Container className="py-8 sm:py-12">
                {/* Page Header */}
                <SectionTitle
                    title="All Blogs"
                    icon={<Flame className="w-5 h-5 sm:w-6 sm:h-6 text-accent-cyan" />}
                    className="mb-4 sm:mb-6"
                />

                {/* Back to Home Button */}
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>

                {/* Description */}
                <p className="text-text-muted mb-6 sm:mb-8 text-sm sm:text-base">
                    Explore my latest learnings and coding adventures. Click a blog to dive deeper!
                </p>

                {/* Filter Tags */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-xs sm:text-sm font-semibold text-text mb-3">Filter by topic:</h3>

                    {/* Horizontal scrollable container for mobile */}
                    <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
                        <div className="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0">
                            {/* All button */}
                            <button
                                type="button"
                                onClick={() => setSelectedTag(null)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedTag === null
                                        ? "bg-accent-cyan text-bg shadow-lg shadow-accent-cyan/30"
                                        : "bg-surface-dark text-text-muted hover:bg-gray-700 hover:text-text border border-border-dark"
                                    }`}
                            >
                                All ({BLOGS.length})
                            </button>

                            {/* Tag buttons */}
                            {allTags.map(tag => {
                                const count = BLOGS.filter(blog => blog.tags.includes(tag)).length;
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedTag === tag
                                                ? "bg-accent-cyan text-bg shadow-lg shadow-accent-cyan/30"
                                                : "bg-surface-dark text-text-muted hover:bg-gray-700 hover:text-text border border-border-dark"
                                            }`}
                                    >
                                        {tag} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active filter indicator */}
                    {selectedTag && (
                        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-xs sm:text-sm text-text-muted">
                                Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""} with tag:
                            </span>
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-xs sm:text-sm font-medium border border-accent-cyan/20">
                                {selectedTag}
                                <button
                                    type="button"
                                    onClick={() => setSelectedTag(null)}
                                    className="hover:bg-accent-cyan/20 rounded-full p-0.5 transition-colors"
                                    aria-label="Clear filter"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        </div>
                    )}
                </div>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {filteredBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
                            <div className="bg-surface-dark border border-border-dark rounded-lg p-4 sm:p-5 shadow-md hover:shadow-xl hover:shadow-accent-cyan/20 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-text mb-2 group-hover:text-accent-cyan line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-text-muted text-xs sm:text-sm lg:text-base mb-3 flex-grow line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                                    {blog.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-accent-cyan/10 text-accent-cyan rounded border border-accent-cyan/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <span className="text-xs text-text-muted">{blog.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* No results message */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-text-muted text-base sm:text-lg">No blogs found with this tag.</p>
                    </div>
                )}
            </Container>
            <Footer />
        </>
    );
}