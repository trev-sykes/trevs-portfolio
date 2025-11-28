import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

interface Props {
    email: string;
    github: string;
    linkedin: string;
}

export default function ContactButtons({ email, github, linkedin }: Props) {
    const BUTTON_BASE =
        "px-3 sm:px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition-all text-sm sm:text-base justify-center sm:justify-start";

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            {/* Email */}
            <a
                href={`mailto:${email}`}
                className={`${BUTTON_BASE} bg-accent-purple text-text hover:bg-accent-purple-dark hover:shadow-accent-purple/50`}
            >
                <Mail className="w-4 h-4" />
                <span className="truncate">{email}</span>
            </a>

            {/* LinkedIn */}
            <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON_BASE} bg-accent-blue text-text hover:bg-accent-blue-dark hover:shadow-accent-blue/50`}
            >
                <Linkedin className="w-4 h-4" /> LinkedIn
            </a>

            {/* GitHub */}
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON_BASE} bg-surface text-text hover:bg-surface/80 hover:shadow-surface/50`}
            >
                <Github className="w-4 h-4" /> GitHub
            </a>
        </div>
    );
}
