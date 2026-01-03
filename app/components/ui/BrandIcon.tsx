
export function BrandIcon({
    path,
    className,
}: {
    path: string;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d={path} />
        </svg>
    );
}
