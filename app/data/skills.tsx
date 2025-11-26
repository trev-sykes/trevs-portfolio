import {
    Code, FileText, Server, TrendingUp,
    Zap, Layers, GitBranch, CheckCircle,
    Database, GitPullRequest, Aperture
} from 'lucide-react';
import { Skill } from "../types/skill";

const SKILLS: Skill[] = [
    // Frontend
    { name: "React", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5 text-blue-400" /> },
    { name: "Tailwind CSS", icon: <TrendingUp className="w-5 h-5 text-teal-400" /> },
    { name: "Framer Motion", icon: <Aperture className="w-5 h-5 text-pink-400" /> },
    // Backend & DB
    { name: "Node.js", icon: <Server className="w-5 h-5 text-green-400" /> },
    { name: "Express", icon: <FileText className="w-5 h-5 text-yellow-400" /> },
    { name: "Prisma", icon: <Database className="w-5 h-5 text-indigo-400" /> },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-blue-500" /> },
    // Blockchain
    { name: "Solidity", icon: <GitBranch className="w-5 h-5 text-purple-400" /> },
    { name: "Ethereum", icon: <Layers className="w-5 h-5 text-gray-400" /> },
    // Tools
    { name: "Vercel", icon: <Layers className="w-5 h-5 text-white" /> },
    { name: "Vite", icon: <CheckCircle className="w-5 h-5 text-orange-400" /> },
    { name: "Git/GitHub", icon: <GitPullRequest className="w-5 h-5 text-red-400" /> },
];

export default SKILLS;