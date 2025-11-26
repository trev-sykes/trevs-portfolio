import React from "react";

interface Props {
    name: string;
    size?: "sm" | "md" | "lg"; // optional, can expand later
}

const SIZE_CLASSES = {
    sm: "w-24 h-24 text-4xl md:w-28 md:h-28 md:text-5xl",
    md: "w-32 h-32 text-6xl md:w-40 md:h-40 md:text-6xl",
    lg: "w-48 h-48 text-8xl md:w-56 md:h-56 md:text-8xl",
};

export default function Avatar({ name, size = "md" }: Props) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <div
            className={`flex-shrink-0 ${SIZE_CLASSES[size]} bg-gradient-to-br from-cyan-500 to-purple-600 rounded-md flex items-center justify-center overflow-hidden shadow-2xl border-4 border-gray-700 hover:scale-105 hover:rotate-3 transition-all duration-300 cursor-pointer`}
        >
            <img
                src="/mugshot.jpeg"
                alt={name}
                className="w-full h-full object-cover scale-120"
                style={{ objectPosition: 'center' }}
            />
        </div>
    );
}
