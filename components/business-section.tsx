"use client";

import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";

export const BusinessSection = () => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1: Team Plan */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col gap-4 hover:border-slate-600 transition">
                    <div className="h-12 w-12 bg-sky-900/50 rounded-lg flex items-center justify-center mb-2">
                        <Users className="h-6 w-6 text-sky-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">CoursePlatform for Business</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Get unlimited access to 25,000+ of our top courses for your team. Learn and improve skills across business, tech, design, and more.
                    </p>
                    <Button className="w-fit mt-2 bg-sky-600 hover:bg-sky-700 text-white">
                        Get CoursePlatform Business
                    </Button>
                </div>

                {/* Card 2: Instructor Plan */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex flex-col gap-4 hover:border-slate-600 transition">
                    <div className="h-12 w-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-2">
                        <Building2 className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Teach the world</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Create an online video course, reach students across the globe, and earn money. We provide the tools and support you need.
                    </p>
                    <Button className="w-fit mt-2 bg-white text-slate-900 hover:bg-slate-200">
                        Start Teaching Today
                    </Button>
                </div>

            </div>
        </div>
    )
}