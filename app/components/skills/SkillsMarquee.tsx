import SKILLS from "@/app/data/skills";
import MarqueeRow from "./MarqueeRow";
import { Flame } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

export default function SkillsMarquee() {
    const midpoint = Math.ceil(SKILLS.length / 2);
    const row1 = SKILLS.slice(0, midpoint);
    const row2 = SKILLS.slice(midpoint);

    return (
        <section className="shadow-lg p-6 overflow-hidden">
            <SectionTitle
                title="🛠️ Tech Stack"
                icon={<Flame className="w-6 h-6 text-orange-400" />}
            />

            {/* Each row scrolls horizontally on mobile */}
            <MarqueeRow row={row1} direction="left" />
            <MarqueeRow row={row2} direction="right" />
        </section>
    );
}
