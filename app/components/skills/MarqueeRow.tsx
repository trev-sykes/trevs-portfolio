import React from "react";
import SkillItem from "./SkillItem";

interface Skill {
    name: string;
    icon: React.ReactNode;
}

export default function MarqueeRow({
    row,
    direction,
}: {
    row: Skill[];
    direction: "left" | "right";
}) {
    const fullRow = [...row, ...row];
    const animationClass =
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

    return (
        <div className="overflow-x-auto whitespace-nowrap py-3 px-2 scrollbar-none">
            <div
                className={`inline-flex items-center ${animationClass} pause-on-hover`}
            >
                {fullRow.map((skill, index) => (
                    <SkillItem key={`${skill.name}-${index}`} skill={skill} />
                ))}
            </div>
        </div>

    );
}
