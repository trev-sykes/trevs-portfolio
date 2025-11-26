// components/Footer.tsx
import React from "react";
import { Github, Linkedin, Code, Mail, Flame } from "lucide-react";
import PROFILE from "@/app/data/profile";
const Footer: React.FC = () => {
    return (
        <footer className="mt-12 py-8 text-center border-t border-gray-800 max-w-5xl mx-auto">
            <p className="text-gray-400 text-sm mb-6">
                Connect with me:
            </p>
            <div className="flex justify-center space-x-6 text-gray-400 mb-6">
                <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:scale-110 transition-all"
                >
                    <Github className="w-7 h-7" />
                </a>
                <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:scale-110 transition-all"
                >
                    <Linkedin className="w-7 h-7" />
                </a>
                <a
                    href={PROFILE.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:scale-110 transition-all"
                >
                    <Code className="w-7 h-7" />
                </a>
                <a
                    href={`mailto:${PROFILE.email}`}
                    className="hover:text-white hover:scale-110 transition-all"
                >
                    <Mail className="w-7 h-7" />
                </a>
            </div>
            <p className="text-xs text-gray-600">
                Trevor Sykes. © 2025
            </p>
        </footer>
    );
};

export default Footer;
