"use client";

import { Quote } from "lucide-react";

export const StatsSection = () => {
    return (
        <div className="space-y-24 py-12 border-t" style={{ borderColor: 'var(--border)' }}>
            {/* STATS AREA */}
            <div className="text-center space-y-12">
                <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--foreground)' }}
                >
                    Empowering Aspiring Developers to Build Their Future!
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <h3
                            className="text-5xl font-extrabold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            6 months
                        </h3>
                        <p className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">on average to land a job</p>
                    </div>
                    <div className="space-y-2">
                        <h3
                            className="text-5xl font-extrabold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            7,000,000+
                        </h3>
                        <p className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">students trained</p>
                    </div>
                    <div className="space-y-2">
                        <h3
                            className="text-5xl font-extrabold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            1 Billion+
                        </h3>
                        <p className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">views and counting</p>
                    </div>
                </div>

                {/* Company Logos Grid (Simplified) */}
                <div className="pt-8">
                    <p className="mb-6 font-medium text-muted-foreground">Helped students achieve their dream job at</p>
                    <div className="flex flex-wrap justify-center gap-4 opacity-50">
                        {["Google", "Amazon", "Microsoft", "Netflix", "Adobe"].map(brand => (
                            <span
                                key={brand}
                                className="px-6 py-3 rounded-md font-bold border transition"
                                style={{
                                    backgroundColor: 'var(--secondary)',
                                    color: 'var(--secondary-foreground)',
                                    borderColor: 'var(--border)'
                                }}
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS AREA */}
            <div className="space-y-10">
                <h2
                    className="text-3xl md:text-4xl font-bold text-center"
                    style={{ color: 'var(--foreground)' }}
                >
                    Testimonials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-xl border relative transition" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                        <Quote className="h-8 w-8 absolute top-6 left-6 text-muted-foreground" />
                        <p className="mt-8 mb-6 italic leading-relaxed" style={{ color: 'var(--card-foreground)' }}>
                            "I don't have words to thank this platform. I'm really grateful to have this channel in my daily routine. If you're a mere beginner, then you can trust this platform..."
                        </p>
                        <div>
                            <h4 className="font-bold" style={{ color: 'var(--foreground)' }}>Mohit Kumar</h4>
                            <p className="text-sm text-muted-foreground">Web Developer</p>
                        </div>
                    </div>
                    <div className="p-8 rounded-xl border relative transition" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                        <Quote className="h-8 w-8 absolute top-6 left-6 text-muted-foreground" />
                        <p className="mt-8 mb-6 italic leading-relaxed" style={{ color: 'var(--card-foreground)' }}>
                            "For everyone who wants to level up their coding skills - seriously, this platform is for you! Both basic and advanced stacks are covered..."
                        </p>
                        <div>
                            <h4 className="font-bold" style={{ color: 'var(--foreground)' }}>Rakesh Shetty</h4>
                            <p className="text-sm text-muted-foreground">Software Engineer</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}