import React from "react";

interface Props {
    name: string;
    size?: "sm" | "md" | "lg";
    frameThickness?: number; // dynamic frame thickness in px
}

const SIZE_CLASSES = {
    sm: "w-24 h-24 text-4xl md:w-28 md:h-28 md:text-5xl",
    md: "w-32 h-32 text-6xl md:w-40 md:h-40 md:text-6xl",
    lg: "w-48 h-48 text-8xl md:w-56 md:h-56 md:text-8xl",
};

const FRAME_COLORS = [
    "#7adfe7", // cyan
    "#60a5fa", // blue
    "#34d399", // green
    "#10b981", // green-dark
    "#f87171", // red
    "#a855f7", // purple
    "#f97316", // orange
    "#9333ea", // purple-dark
    "#7dd3fc", // blue-light
    "#67e8f9", // cyan-light
];

export default function Avatar({ name, size = "md", frameThickness = 1 }: Props) {
    const [imageError, setImageError] = React.useState(false);
    const [frameColor, setFrameColor] = React.useState<string | null>(null);

    // Pick a random color only on the client
    React.useEffect(() => {
        setFrameColor(FRAME_COLORS[Math.floor(Math.random() * FRAME_COLORS.length)]);
    }, []);

    const initials = name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .slice(0, 3);

    if (frameColor === null) {
        // Render nothing or a placeholder until client mounts
        return null;
    }

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
                <img
                    src="/mugshot.jpeg"
                    alt={name}
                    className="relative z-10 w-full h-full object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="relative z-10 flex h-full w-full items-center justify-center font-bold text-white">
                    {initials}
                </div>
            )}
        </div>
    );
}