// ui/SectionTitle.tsx
import React from "react";

interface SectionTitleProps {
    title: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function SectionTitle({ title, icon, className = "" }: SectionTitleProps) {
    return (
        <h2 className={`text-2xl font-bold text-gray-50 mb-6 flex items-center gap-3 ${className}`}>
            {icon && <span className="w-6 h-6">{icon}</span>}
            {title}
        </h2>
    );
}
