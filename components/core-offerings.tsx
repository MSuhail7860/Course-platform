"use client";

import { Lightbulb, Layers, Code, DollarSign, BookOpen, Building2 } from "lucide-react";

const offerings = [
    {
        icon: Lightbulb,
        title: "Beginner-Friendly",
        desc: "Step-by-step courses designed for absolute beginners to kickstart their coding journey."
    },
    {
        icon: Layers,
        title: "Advanced Concepts",
        desc: "Deep dive into advanced topics and frameworks to level up your skills."
    },
    {
        icon: Code,
        title: "Real-World Projects",
        desc: "Learn by building real-world projects and gain hands-on experience."
    },
    {
        icon: DollarSign,
        title: "Affordable Pricing",
        desc: "Access premium courses at prices tailored for students and professionals."
    },
    {
        icon: BookOpen,
        title: "Comprehensive Resources",
        desc: "Gain access to a variety of coding resources such as templates, documentation, and snippets."
    },
    {
        icon: Building2,
        title: "Industry Insights",
        desc: "Stay updated with the latest trends and insights from the tech industry."
    }
];

export const CoreOfferings = () => {
    return (
        <div className="py-12 space-y-12">
            <h2
                className="text-3xl md:text-4xl font-bold text-center"
                style={{ color: 'var(--foreground)' }}
            >
                Master Coding with Our Core Offerings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerings.map((item) => (
                    <div
                        key={item.title}
                        className="p-8 rounded-xl border transition duration-300 flex flex-col items-center text-center space-y-4 shadow-sm"
                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                    >
                        <div
                            className="h-14 w-14 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: 'var(--secondary)' }}
                        >
                            <item.icon
                                className="h-6 w-6"
                                style={{ color: 'var(--primary)' }}
                            />
                        </div>
                        <h3
                            className="text-xl font-bold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {item.title}
                        </h3>
                        <p
                            className="leading-relaxed text-sm"
                            style={{ color: 'var(--muted-foreground)' }}
                        >
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}