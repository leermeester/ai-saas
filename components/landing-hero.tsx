"use client";

import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
    const {isSignedIn} = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                    options={{
                        strings: [
                            "Chatbots",
                            "Photo Generation",
                            "Music Generation",
                            "Video Generation",
                            "Code Generation",
                        ],
                        autoStart: true,
                        loop: true
                    }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-lg text-zinc-400">
                AI-Powered solutions for your business.
            </div>
        </div>
    )
}