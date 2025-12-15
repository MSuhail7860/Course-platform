"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Star } from "lucide-react";

export const SkillsSection = () => {
    return (
        <div className="p-6 space-y-6 bg-slate-950/50 border-y border-slate-800">
            <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                    Skills to transform your career and life
                </h2>
                <p className="text-slate-400">
                    From critical skills to technical topics, we support your professional development.
                </p>
            </div>

            <Tabs defaultValue="fitness" className="w-full">
                {/* SCROLLABLE TAB LIST */}
                <div className="overflow-x-auto pb-2">
                    <TabsList className="bg-transparent h-auto p-0 flex justify-start gap-2 w-max">
                        {/* List of Your Categories */}
                        {[
                            "Fitness",
                            "Music",
                            "Photography",
                            "Accounting",
                            "Filming",
                            "Computer Science",
                            "Engineering"
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab.toLowerCase().replace(" ", "-")}
                                className="
                    data-[state=active]:bg-white data-[state=active]:text-slate-950 
                    text-slate-400 border border-slate-700 rounded-full px-5 py-2.5 
                    font-medium transition hover:border-slate-500
                "
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* --- FITNESS CONTENT --- */}
                <TabsContent value="fitness" className="mt-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                        {/* Left: Banner / Image Placeholder */}
                        <div className="bg-emerald-900/20 w-full md:w-[350px] aspect-video rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <span className="text-6xl">💪</span>
                        </div>
                        {/* Right: Text Info */}
                        <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">The Complete Fitness Guide</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Join millions of learners. Transform your body with expert coaching on strength training, yoga, and nutrition.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                                    Explore Fitness
                                </Button>
                                <div className="flex items-center text-yellow-500 text-sm font-bold">
                                    4.8 <Star className="h-4 w-4 fill-yellow-500 ml-1" />
                                </div>
                                <span className="text-slate-500 text-sm">(12k ratings)</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* --- PHOTOGRAPHY CONTENT --- */}
                <TabsContent value="photography" className="mt-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                        <div className="bg-purple-900/20 w-full md:w-[350px] aspect-video rounded-lg flex items-center justify-center border border-purple-500/20">
                            <span className="text-6xl">📷</span>
                        </div>
                        <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">Photography Masterclass 2025</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Master your camera settings, lighting, and editing. From portrait to landscape, learn how to tell stories through your lens.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                                    Explore Photography
                                </Button>
                                <div className="flex items-center text-yellow-500 text-sm font-bold">
                                    4.9 <Star className="h-4 w-4 fill-yellow-500 ml-1" />
                                </div>
                                <span className="text-slate-500 text-sm">(8.5k ratings)</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* --- COMPUTER SCIENCE CONTENT --- */}
                <TabsContent value="computer-science" className="mt-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center">
                        <div className="bg-sky-900/20 w-full md:w-[350px] aspect-video rounded-lg flex items-center justify-center border border-sky-500/20">
                            <span className="text-6xl">💻</span>
                        </div>
                        <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">CS101: The Modern Bootcamp</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Algorithms, Data Structures, and System Design. Prepare for technical interviews with industry veterans.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
                                    Explore CS Courses
                                </Button>
                                <div className="flex items-center text-yellow-500 text-sm font-bold">
                                    4.7 <Star className="h-4 w-4 fill-yellow-500 ml-1" />
                                </div>
                                <span className="text-slate-500 text-sm">(22k ratings)</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Placeholder for others to prevent errors if clicked */}
                {["music", "accounting", "filming", "engineering"].map(val => (
                    <TabsContent key={val} value={val} className="mt-8 text-center py-10 text-slate-500">
                        Content for <span className="capitalize">{val}</span> coming soon.
                    </TabsContent>
                ))}

            </Tabs>
        </div>
    )
}