import Image from "next/image";
import React from "react";

interface Props {
    name: string;
    size?: "sm" | "md" | "lg";
    frameThickness?: number;
}

const SIZE_CLASSES = {
    sm: "w-24 h-24 text-4xl md:w-28 md:h-28 md:text-5xl",
    md: "w-32 h-32 text-6xl md:w-40 md:h-40 md:text-6xl",
    lg: "w-48 h-48 text-8xl md:w-56 md:h-56 md:text-8xl",
};

const FRAME_COLORS = [
    "#7adfe7",
    "#60a5fa",
    "#34d399",
    "#10b981",
    "#f87171",
    "#a855f7",
    "#f97316",
    "#9333ea",
    "#7dd3fc",
    "#67e8f9",
];

export default function Avatar({ name, size = "md", frameThickness = 1 }: Props) {
    const [frameColor, setFrameColor] = React.useState<string | null>(null);
    const [imageError, setImageError] = React.useState(false);

    React.useEffect(() => {
        setFrameColor(FRAME_COLORS[Math.floor(Math.random() * FRAME_COLORS.length)]);
    }, []);

    const initials = name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .slice(0, 3);

    if (frameColor === null) return null;

    return (
        <div
            className={`relative flex-shrink-0 ${SIZE_CLASSES[size]} rounded-md overflow-hidden`}
            style={{
                borderWidth: `${frameThickness}px`,
                borderColor: frameColor,
                boxShadow: `0 0 10px ${frameColor}50`,
            }}
        >
            {/* Inner overlay border */}
            <div
                className="absolute inset-1 rounded-md pointer-events-none z-20"
                style={{
                    borderWidth: `${Math.max(1, Math.floor(frameThickness / 2))}px`,
                    borderColor: "rgba(255,255,255,0.2)",
                }}
            />

            {/* Image or fallback */}
            {!imageError ? (
                <Image
                    src="/mugshot.jpeg"
                    alt={name}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjY2NjY2NjIiAvPjwvc3ZnPg=="
                    onError={() => setImageError(true)}
                    className="relative z-10"
                />
            ) : (
                <div className="relative z-10 flex h-full w-full items-center justify-center font-bold text-white bg-gray-500">
                    {initials}
                </div>
            )}
        </div>
    );
}
