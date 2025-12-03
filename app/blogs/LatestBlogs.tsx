// components/blogs/LatestBlog.tsx
import Link from "next/link";
import BLOGS, { BlogPost } from "@/app/data/blogs";
import { Flame } from "lucide-react";

export default function LatestBlog() {
    const latestBlog: BlogPost = BLOGS[0];

    return (
        <section className="shadow-lg p-4 sm:p-5  mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg sm:text-xl font-semibold text-text">
                    Latest Learning
                </h3>
            </div>

            <p className="text-text-muted mb-2">{latestBlog.excerpt}</p>
            <span className="text-xs text-text-muted block mb-3">{latestBlog.date}</span>

            <div className="flex gap-2 flex-wrap">
                <Link
                    href={`/blogs/${latestBlog.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-blue hover:bg-accent-blue-light text-text rounded-sm font-semibold text-sm"
                >
                    Read Blog
                </Link>

                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-border-dark text-text rounded-sm hover:border-accent-blue-light hover:text-accent-blue-light transition-all text-sm"
                >
                    See All Blogs
                </Link>
            </div>
        </section>
    );
}
