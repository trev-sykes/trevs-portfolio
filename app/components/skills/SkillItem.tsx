import React from "react";

interface Skill {
    name: string;
    icon: React.ReactNode;
}

export default function SkillItem({ skill }: { skill: Skill }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 rounded-full text-gray-300 text-sm sm:text-base flex-shrink-0 mx-2 sm:mx-4 border border-gray-700 hover:border-cyan-500 hover:shadow-cyan-500/50 transition-all shadow-lg">
            {skill.icon}
            <span className="whitespace-nowrap">{skill.name}</span>
        </div>
    );
}
