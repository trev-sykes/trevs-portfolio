import { Project } from "../types/project";

const PROJECTS: Project[] = [
    {
        id: 1,
        slug: 'Feels-Aggregate',
        title: "Feels-Aggregate",
        logo: '/logos/feels-aggregate.png',
        description: "A real-time, anonymous mood tracker that allows users to vote on their current emotion and explore live global sentiment through interactive heatmaps.",

        mobileDescription: "Anonymous real-time global mood tracker with a live emotion heatmap.",
        summary: "Built with Next.js, Prisma, and PostgreSQL, the project emphasizes modular architecture and a deliberately minimal database schema. This project marked my transition from a React + Vite and Express backend to Next.js’ full-stack model, allowing me to consolidate frontend, backend, and data access into a more cohesive system. The result was a noticeably cleaner codebase, improved performance, and reduced architectural friction. Through this build, I learned the value of planning around data models early and resisting unnecessary over-engineering in favor of clarity and maintainability.",
        challenges:
            "The primary challenge was adapting to Next.js’ routing and server action model. Coming from React Router and manually defined API endpoints, the file-based routing system required a mental shift but ultimately proved more ergonomic and expressive. Understanding when to use \"use server\" versus \"use client\" introduced some friction early on, particularly around rendering boundaries. However, Next.js’ clear error messaging and feedback loop made these issues easy to diagnose and resolve, reinforcing confidence in the framework’s design.",

        learnings: [
            "Next.js App Router and file-based routing",
            "Server Actions and client/server boundaries"
        ],

        liveDemo: "https://feels-aggregate.vercel.app/",
        github: "https://github.com/trev-sykes/feels-aggregate",
        thumbnail: "/projects/feels-aggregate.png",
        tech: ["Next.js", "Prisma", "PostgreSQL"],
        hosting: ["Vercel", "Neon"],
        category: 'deep',
        date: '2025-12'
    },
    {
        id: 2,
        slug: 'ChatRooms',
        title: "ChatRooms",
        logo: '/logos/chatrooms.png',
        description:
            "A modern full-stack chat app with real-time messaging, user authentication, and a responsive, mobile-first design.",
        mobileDescription:
            "Real-time chat app with authentication, animations, and a modern UI.",
        summary: "Built with React + Vite and Express + Prisma, this was my first true full-stack project and a personal challenge. Transitioning from a Web3 background, I discovered that traditional backends can be simpler and more approachable. This project gave me the chance to focus on solid Express architecture using routes, models, controllers, and services. It taught me a lot about project design, and I can already see how these lessons will make my next projects cleaner and more maintainable.",
        liveDemo: "https://chat-rooms-chi.vercel.app/",
        challenges:
            "Integrating WebSockets for real-time features like typing indicators, read/unread states, and online presence took significant trial and error, but ultimately unlocked a deeper understanding of app reactivity. Structuring the project was another challenge: my initial monolithic setup—placing the React app, Express server, and Prisma client in the root directory—created some maintenance headaches. I also navigated authentication and session management, which were tricky at first, but once set up, felt like a clean, one-and-done solution. Overall, these challenges taught me the importance of thoughtful architecture and careful planning.",
        learnings: [
            "Auth and session management",
            "WebSocket integration",
            "Project architecture and design",
            "Building APIs with Express and Prisma"
        ],
        github: "https://github.com/trev-sykes/ChatRooms",
        thumbnail: "/projects/chatrooms.png",
        tech: [
            "React",
            "TypeScript",
            "Express.js",
            "Prisma",
            "PostgreSQL",
            "Framer Motion",
            "Vite"
        ],
        hosting: ["Vercel", "Render", "Neon"],
        category: 'deep',
        date: '2025-07'
    },
    {
        id: 3,
        slug: "Question-Everything",
        title: "Question Everything",
        logo: "/logos/question-everything.png",
        description:
            "A personal blog where I explore topics like crypto, conspiracies, technology, AI, and more.",
        mobileDescription: "Animated blog sharing thoughts on tech, crypto, and big ideas.",
        summary: "Built with React, TypeScript, Vite, and Framer Motion.Features smooth transitions and content animations, offering a space to share ideas and insights. Github comments integreated for ongoing discussions for each blog. ",
        liveDemo: "https://question-everything.vercel.app/",
        github: "https://github.com/trev-sykes/question-everything",
        thumbnail: "/projects/question-everything.png",
        tech: ["React", "TypeScript", "Vite", "Framer Motion", "Tailwind CSS"],
        hosting: ["Vercel"],
        category: 'deep',
        date: '2025-04'
    },
    {
        id: 4,
        slug: 'Nostromo-Notes',
        title: "Nostromo Notes",
        logo: '/logos/nostromo-notes.png',
        description:
            "A terminal-style React app inspired by the Alien franchise.",
        mobileDescription: "Alien-inspired terminal app for notes with retro animations.",
        summary: " Built with React, TypeScript, Vite, and Zustand for efficient state management. Users can add, modify, and delete notes with interactive features, animations, and a nostalgic boot sequence.",
        liveDemo: "https://nostromo-notes.vercel.app/",
        github: "https://github.com/trev-sykes/nostromo-notes",
        thumbnail: "/projects/nostromo-notes.png",
        tech: ["React", "TypeScript", "Vite", "Zustand", "Framer Motion", "Tailwind CSS"],
        hosting: ["Vercel"],
        category: 'shallow',
        date: '2025-01'
    },
    {
        id: 5,
        slug: "Home-Page-Template",
        title: "Home Page Template",
        description:
            "A sleek and modern landing page with Web3 aesthetics.",
        mobileDescription: "Modern Web3-style landing page with smooth animations.",
        summary: "Built with React, TypeScript, TailwindCSS, Vite, and Framer Motion. Features smooth animations, responsive interactive buttons, and a polished, adaptable layout suitable for e-commerce brands and Web3 dApps.",
        liveDemo: "https://home-page-template.vercel.app/",
        github: "https://github.com/trev-sykes/home-page-template",
        thumbnail: "/projects/home-page.png",
        tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
        hosting: ["Vercel"],
        category: 'shallow',
        date: '2024-11'
    },
    {
        id: 6,
        slug: "Bonding-Curve-Simulator",
        title: "Bonding Curve Sim",
        logo: "/logos/bonding-curve-simulator.png",
        description:
            "Interactive tokenomics visualization with bonding curves.",
        mobileDescription: "Visual simulator for token bonding curves and market dynamics.",
        summary: "Built with React, TypeScript, ReCharts, and Material UI. Simulates asset prices in bonding curve markets with real-time charts. Features linear + logarithmic curves, random trade execution, and responsive design.",
        liveDemo: "https://bonding-curve-asset-simulator.vercel.app/",
        github: "https://github.com/trev-sykes/BondingCurveSimulator",
        thumbnail: "/projects/bonding-curve.png",
        tech: ["React", "TypeScript", "ReCharts", "Material UI", "Vite"],
        hosting: ["Vercel"],
        category: 'archived',
        date: '2024-03'
    },
    {
        id: 7,
        slug: "Stablecoin-Protocol",
        title: "Stablecoin Protocol",
        logo: "/logos/stablecoin-protocol.png",
        description:
            "A decentralized stablecoin protocol on Ethereum Sepolia.",
        mobileDescription: "BTC-backed stablecoin dApp with on-chain minting and liquidation.",
        summary: "Built with Solidity for BTC-backed minting and liquidation with 10% bonuses. Features a React + TypeScript frontend with Chainlink price feeds for real-time BTC pricing and Ethers.js for blockchain integration.",
        liveDemo: "https://stablecoin-protocol.vercel.app/",
        github: "https://github.com/trev-sykes/Stablecoin-Protocol",
        thumbnail: "/projects/stablecoin.png",
        tech: ["Solidity", "React", "TypeScript", "Ethers.js", "Chainlink", "Vite"],
        hosting: ["Sepolia Testnet", "Vercel"],
        category: 'archived',
        date: '2024-01'
    },
    {
        id: 8,
        slug: "Bonding-Curve-Marketplace",
        title: "Hype Dex",
        description:
            "A decentralized bonding curve marketplace for creating, minting, and burning ETH-backed ERC-6909 tokens.",
        mobileDescription: "Decentralized token market with bonding curves and on-chain reserves.",
        summary: " Built with React, TypeScript, Solidity, Foundry, and Wagmi, featuring quadratic token pricing, real-time charting, and trustless on-chain reserves.",
        liveDemo: "https://hype-it.vercel.app/",
        github: "https://github.com/trev-sykes/hype-dex",
        thumbnail: "/projects/hype-dex.png",
        tech: ["React", "TypeScript", "Solidity", "Foundry", "Wagmi", "Ethers.js", "Vite"],
        hosting: ["Ethereum Mainnet", "Vercel"],
        category: 'archived',
        date: '2023-11'
    },
    {
        id: 9,
        slug: "Decentralized-Confessional",
        title: "Proof of Regret",
        logo: '/logos/proof-of-regret.png',
        description:
            "A Web3 dApp on Arbitrum that lets users confess regrets for 0.001 ETH, seek forgiveness for 0.0001 ETH, and resolve after 3 days with ETH payouts.",
        mobileDescription: "Confess regrets and earn ETH — a reflective Web3 dApp on Arbitrum.",
        summary: " Built with React, TypeScript, and Solidity, featuring real-time blockchain data and responsive confession cards.",
        liveDemo: "https://proof-of-regret.vercel.app/",
        github: "https://github.com/trev-sykes/proof-of-regret",
        thumbnail: "/projects/proof-of-regret.png",
        tech: ["React", "TypeScript", "Solidity", "Ethers.js", "Vite", "Tailwind CSS"],
        hosting: ["Arbitrum Testnet", "Vercel"],
        category: 'archived',
        date: '2023-08'
    }
];

export default PROJECTS;
