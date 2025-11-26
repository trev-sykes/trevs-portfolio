import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

interface Props {
    email: string;
    github: string;
    linkedin: string;
}

export default function ContactButtons({ email, github, linkedin }: Props) {
    const BUTTON_BASE =
        "px-3 sm:px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition-all text-sm sm:text-base";

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            {/* Email */}
            <a
                href={`mailto:${email}`}
                className={`${BUTTON_BASE} bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-500/50 justify-center sm:justify-start`}
            >
                <Mail className="w-4 h-4" />
                <span className="truncate">{email}</span>
            </a>

            {/* LinkedIn */}
            <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON_BASE} bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/50 justify-center sm:justify-start`}
            >
                <Linkedin className="w-4 h-4" /> LinkedIn
            </a>

            {/* GitHub */}
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON_BASE} bg-gray-700 text-white hover:bg-gray-600 hover:shadow-gray-500/50 justify-center sm:justify-start`}
            >
                <Github className="w-4 h-4" /> GitHub
            </a>
        </div>
    );
}