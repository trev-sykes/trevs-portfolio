import React from "react";

interface Skill {
    name: string;
    icon: React.ReactNode;
}

export default function SkillItem({ skill }: { skill: Skill }) {
    return (
        <div
            className={`
                group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3
                text-text-muted text-sm sm:text-base
                flex-shrink-0 mx-2 sm:mx-4
                cursor-pointer
            `}
            role="img"
            aria-label={skill.name} // announces the skill name
        >
            <span>{skill.icon}</span>
            <span className="whitespace-nowrap">{skill.name}</span>
        </div>
    );
}
