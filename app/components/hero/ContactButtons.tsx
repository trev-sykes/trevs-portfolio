import { Mail, Github, Linkedin, X, FileText } from "lucide-react";

interface Props {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    resume?: string; // optional, path to PDF
}

export default function ContactButtons({ email, github, linkedin, twitter, resume }: Props) {
    const BUTTON_BASE =
        "px-2 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-md transition-all text-xs sm:text-sm justify-center";

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {/* Existing buttons */}
            <a href={`mailto:${email}`} className={`${BUTTON_BASE} bg-accent-purple text-text hover:bg-accent-purple-dark hover:shadow-accent-purple/50`}>
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{email}</span>
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={`${BUTTON_BASE} bg-accent-blue text-text hover:bg-accent-blue-dark hover:shadow-accent-blue/50`}>
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" /> LinkedIn
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className={`${BUTTON_BASE} bg-surface text-text hover:bg-surface/80 hover:shadow-surface/50`}>
                <Github className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub
            </a>
            {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className={`${BUTTON_BASE} bg-black text-white hover:bg-pink-500 hover:shadow-pink-400/50`}>
                    <X className="w-3 h-3 sm:w-4 sm:h-4" /> @freshly_mulched
                </a>
            )}

            {/* Resume button */}
            {resume && (
                <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${BUTTON_BASE} bg-accent-green-dark text-white hover:bg-green-600 hover:shadow-green-400/50`}
                >
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> Resume
                </a>
            )}
        </div>
    );
}
