import { notFound } from "next/navigation";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import BLOGS from "@/app/data/blogs";
import Link from "next/link";
import Footer from "@/app/components/footer/Footer";
import { Sparkles } from "lucide-react";

// Props type for the page
interface Props {
    params: Promise<{ id: string }>;
}

// Define markdown components
const markdownComponents: Partial<Components> = {
    h1: ({ node, ...props }) => (
        <h1 className="text-3xl font-bold text-accent-cyan my-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 className="text-2xl font-semibold text-accent-cyan my-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 className="text-xl font-semibold text-accent-cyan my-2" {...props} />
    ),
    p: ({ node, ...props }) => (
        <p className="text-text leading-relaxed mb-3" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
        if (inline) {
            return (
                <code
                    className="bg-surface-dark px-1 py-0.5 rounded text-accent-cyan font-mono"
                    {...props}
                >
                    {children}
                </code>
            );
        }

        // For code blocks, return only the <code> element
        // rehype-highlight will wrap it in <pre> automatically
        return (
            <code
                className={className}
                {...props}
            >
                {children}
            </code>
        );
    },
    pre: ({ node, ...props }) => (
        <pre className="bg-surface-dark text-text p-4 rounded-md overflow-x-auto shadow-sm my-4" {...props} />
    ),
    li: ({ node, ...props }) => (
        <li className="mb-1 ml-4 list-disc text-text" {...props} />
    ),
    a: ({ node, ...props }) => (
        <a className="text-accent-cyan hover:underline" {...props} />
    ),
};

export default async function BlogPost({ params }: Props) {
    const { id } = await params;

    const blog = BLOGS.find((b) => b.id === id);
    if (!blog) return notFound();

    // Exclude current blog
    const otherBlogs = BLOGS.filter(b => b.id !== id);

    // Shuffle the array using Fisher-Yates
    for (let i = otherBlogs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherBlogs[i], otherBlogs[j]] = [otherBlogs[j], otherBlogs[i]];
    }

    // Pick first two after shuffle
    const recommended = otherBlogs.slice(0, 2);

    return (
        <>
            <section className="max-w-4xl mx-auto p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="text-accent-cyan hover:underline text-sm sm:text-base">
                        ← Home
                    </Link>
                    <Link href="/blogs" className="text-accent-cyan hover:underline text-sm sm:text-base">
                        See All Blogs
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-text">{blog.title}</h1>
                <span className="text-text-muted mb-6 block">{blog.date}</span>

                <article className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={markdownComponents}
                    >
                        {blog.content.trim()}
                    </ReactMarkdown>
                </article>

                {/* YOU MAY ALSO LIKE SECTION */}
                <div className="mt-14">
                    <h2 className="text-2xl font-semibold text-accent-cyan mb-4 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        You may also like
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {recommended.map((rec) => (
                            <Link
                                key={rec.id}
                                href={`/blogs/${rec.id}`}
                                className="group bg-surface-dark border border-border-dark rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-accent-cyan/20 hover:-translate-y-1 transition-all duration-300"
                            >
                                <h3 className="text-lg font-semibold text-text group-hover:text-accent-cyan mb-1">
                                    {rec.title}
                                </h3>
                                <p className="text-text-muted text-sm">{rec.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}