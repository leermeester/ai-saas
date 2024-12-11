"use client";

const testimonials = [
    {
        name: "Dirk-Jan",
        avatar: "https://github.com/leermeester.png",
        title: "AI Consultant",
        description: "This is the best AI tool I've ever used. It's so easy to use and it's so fast. I'm so happy I found it.",
    },
    {
        name: "Antonio",
        avatar: "A",
        title: "Software Engineer",
        description: "This is the best AI tool I've ever used. It's so easy to use and it's so fast. I'm so happy I found it.",
    },
    {
        name: "Arthur",
        avatar: "https://github.com/leermeester.png",
        title: "GenAI Consultant",
        description: "This is the best AI tool I've ever used. It's so easy to use and it's so fast. I'm so happy I found it.",
    },
    {
        name: "Jonathan",
        avatar: "https://github.com/leermeester.png",
        title: "AI Consultant",
        description: "This is the best AI tool I've ever used. It's so easy to use and it's so fast. I'm so happy I found it.",
    }
]


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#1f1f1f] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}