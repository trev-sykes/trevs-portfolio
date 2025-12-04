"use client"
import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";
import PROFILE from "@/app/data/profile";
import ContactButtons from "./ContactButtons";
import Avatar from "./Avatar";

const Hero = () => {
    const { name, location, email, github, linkedin, twitter, tagline, bioShort, bioLong } = PROFILE;

    // State for current PST time
    const [pstTime, setPstTime] = useState("");

    // State for typewriter effect
    const [displayedName, setDisplayedName] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            // Convert to PST (UTC-8 standard, ignoring DST for simplicity)
            const pstOffset = -8 * 60; // PST is UTC-8 in minutes
            const localOffset = now.getTimezoneOffset(); // browser offset in minutes
            const pstDate = new Date(now.getTime() + (pstOffset + localOffset) * 60000);

            // Format as HH:MM:SS AM/PM
            const hours = pstDate.getHours();
            const minutes = pstDate.getMinutes();
            const seconds = pstDate.getSeconds();
            const ampm = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const formattedSeconds = seconds.toString().padStart(2, "0");

            setPstTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`);
        };

        updateTime(); // set immediately
        const interval = setInterval(updateTime, 1000); // update every second
        return () => clearInterval(interval); // cleanup
    }, []);

    // Typewriter effect for name
    useEffect(() => {
        let currentIndex = 0;
        const typingSpeed = 100; // milliseconds per character

        const typeNextCharacter = () => {
            if (currentIndex < name.length) {
                setDisplayedName(name.slice(0, currentIndex + 1));
                currentIndex++;
            }
        };

        const typingInterval = setInterval(typeNextCharacter, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [name]);

    return (
        <section className="shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 bg-bg text-text">
            {/* Left Content */}
            <div className="flex-1 w-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 flex flex-col justify-center">
                        <p className="text-accent-cyan mb-2 text-xs sm:text-sm">Hi, I'm {name.split(" ")[0]} 👋</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text leading-tight">
                            {displayedName}
                            <span className="animate-pulse">|</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center text-text-muted text-xs sm:text-sm gap-2 sm:gap-0 sm:space-x-4 mt-2">
                            <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-accent-red animate-pulse" />
                                {location}
                            </span>

                            <span className="flex items-center font-mono tabular-nums">
                                <Clock className="w-4 h-4 mr-1 text-accent-blue" />
                                {pstTime} PST
                            </span>

                            <span className="flex items-center text-accent-green font-semibold">
                                <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green-dark"></span>
                                </span>
                                Open to collaboration & freelance
                            </span>
                        </div>
                    </div>
                    <div className="md:hidden self-center">
                        <Avatar name={name} size="sm" />
                    </div>
                </div>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed mt-4">
                    <strong className="text-text">{tagline}</strong> — {bioShort}
                </p>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed mt-4">{bioLong}</p>

                <div className="mt-6">
                    <ContactButtons email={email} github={github} linkedin={linkedin} twitter={twitter} />
                </div>
            </div>

            <div className="hidden md:block">
                <Avatar name={name} size="md" />
            </div>
        </section>
    );
};

export default Hero;