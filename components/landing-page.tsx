"use client";

import React, { useState } from "react";
import { BookOpen, Layers, Terminal, Users } from "lucide-react";
import { Course, Category, Chapter } from "@prisma/client";
import Link from "next/link"; // <--- 1. Import Link

interface LandingPageProps {
    courses: (Course & {
        category: Category | null;
        chapters: Chapter[];
    })[];
}

export default function LandingPage({ courses }: LandingPageProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Computer Science",
        "Music",
        "Fitness",
        "Photography",
        "Accounting",
        "Engineering",
        "Filming"
    ];

    const filteredCourses = courses.filter((course) => {
        if (selectedCategory === "All") return true;
        return course.category?.name === selectedCategory;
    });

    const features = [
        {
            icon: <Users className="h-8 w-8 text-purple-600 dark:text-white" />,
            title: "Beginner-Friendly",
            description: "Step-by-step courses designed for absolute beginners to kickstart their coding journey."
        },
        {
            icon: <Terminal className="h-8 w-8 text-purple-600 dark:text-white" />,
            title: "Advanced Concepts",
            description: "Deep dive into advanced topics and frameworks to level up your skills."
        },
        {
            icon: <Layers className="h-8 w-8 text-purple-600 dark:text-white" />,
            title: "Real-World Projects",
            description: "Learn by building real-world projects and gain hands-on experience."
        }
    ];

    const scrollToCourses = () => {
        const element = document.getElementById("courses");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white selection:bg-purple-500 selection:text-white transition-colors duration-300">

            {/* --- HERO SECTION --- */}
            <section className="relative flex flex-col items-center justify-center py-24 px-4 text-center space-y-8">
                <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-slate-100 text-slate-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 text-sm font-medium mb-4">
                    Learn coding the right way
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-5xl">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">CoursePlatform</span>
                </h1>

                <h2 className="text-2xl md:text-3xl text-slate-600 dark:text-neutral-400 font-light">
                    Learn Programming, Web Dev, and AI
                </h2>

                <p className="max-w-2xl text-slate-500 dark:text-neutral-400 text-lg md:text-xl leading-relaxed">
                    Confused about which course to take? We've got you covered! Browse courses and discover the best option for you.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <button
                        onClick={scrollToCourses}
                        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full text-lg transition-all shadow-lg shadow-purple-200 dark:shadow-none"
                    >
                        Recommended Courses
                    </button>
                </div>
            </section>

            {/* --- CORE OFFERINGS --- */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Master Coding with Our Core Offerings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-purple-500/50 hover:shadow-lg transition-all group">
                            <div className="mb-6 p-3 bg-white dark:bg-neutral-800 rounded-lg w-fit group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 transition-colors shadow-sm dark:shadow-none">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- RECOMMENDED COURSES --- */}
            <section id="courses" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h2 className="text-3xl font-bold">Recommended Courses</h2>

                    {/* Categories Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedCategory === cat
                                        ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCourses.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-neutral-500 text-xl font-medium">No Course</p>
                        </div>
                    ) : (
                        filteredCourses.map((course) => (
                            // 2. Wrap the card in a Link
                            <Link key={course.id} href={`/courses/${course.id}`} className="block h-full">
                                <div className="group overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="aspect-video relative w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        {course.imageUrl ? (
                                            <img
                                                src={course.imageUrl}
                                                alt={course.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500">
                                                <span className="text-2xl font-bold text-white uppercase">{course.title.substring(0, 2)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 flex flex-col gap-2 flex-grow">
                                        <h3 className="font-semibold text-lg line-clamp-2 text-slate-900 dark:text-white leading-tight">{course.title}</h3>
                                        <p className="text-xs text-slate-500 dark:text-neutral-400">{course.category?.name || "Uncategorized"}</p>

                                        <div className="flex items-center gap-x-2 text-sm text-slate-600 dark:text-neutral-300 my-2">
                                            <div className="flex items-center gap-x-1 p-1 bg-slate-100 dark:bg-neutral-800 rounded-md">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{course.chapters.length} {course.chapters.length === 1 ? 'Chapter' : 'Chapters'}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-2">
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                                {course.price ? `$${course.price}` : "Free"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>

            {/* --- STATS & FOOTER --- */}
            <section className="py-16 bg-slate-50 dark:bg-neutral-900 text-center border-y border-slate-200 dark:border-none">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Aspiring Developers to Build Their Future!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        <div><h3 className="text-5xl font-bold mb-2">6 months</h3><p className="text-sm uppercase tracking-widest text-slate-500 dark:text-neutral-400">On average to land a job</p></div>
                        <div><h3 className="text-5xl font-bold mb-2">7M+</h3><p className="text-sm uppercase tracking-widest text-slate-500 dark:text-neutral-400">Students Trained</p></div>
                        <div><h3 className="text-5xl font-bold mb-2">1B+</h3><p className="text-sm uppercase tracking-widest text-slate-500 dark:text-neutral-400">Views and Counting</p></div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-neutral-900 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Start Your Coding Journey</h2>
                <p className="text-slate-500 dark:text-neutral-400 mb-8">Learn coding step-by-step with the best programming resources.</p>
                <button className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold rounded-md hover:bg-slate-800 dark:hover:bg-neutral-200 transition-colors">
                    Start Now
                </button>
            </section>

        </div>
    );
}