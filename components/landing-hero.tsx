"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LandingHero = () => {
    return (
        <div className="text-center space-y-8 py-20 px-6 max-w-5xl mx-auto">
            {/* Optional "Pill" Badge */}
            <div className="flex justify-center">
                <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                        borderColor: 'var(--border)'
                    }}
                >
                    Learn coding the right way
                </span>
            </div>

            {/* Main Headline */}
            <h1
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
                style={{ color: 'var(--foreground)' }}
            >
                Welcome to <span className="text-purple-500">CoursePlatform</span>
            </h1>

            {/* Subheadline / Typing Effect Placeholder */}
            <p
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: 'var(--muted-foreground)' }}
            >
                Learn Programming, Web Dev, and AI
            </p>

            {/* Description */}
            <p
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
            >
                Confused about which course to take? We've got you covered! Browse courses and discover the best option for you.
                CoursePlatform is my effort to teach the basics and advanced coding techniques in a short time.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="#courses">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 text-lg rounded-full">
                        Recommended Courses
                    </Button>
                </Link>
            </div>
        </div>
    );
};
