"use client";

import { LayoutDashboard, List, BarChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

export const TeacherSidebar = () => {
    const pathname = usePathname();

    return (
        // FIX: Added dark:bg-gray-900 and dark:border-gray-800
        <div className="flex flex-col w-full h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="p-6">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Teacher Mode
                </span>
            </div>

            <div className="flex flex-col w-full px-3 gap-y-1">
                {routes.map((route) => {
                    const isActive = (pathname === route.href) || (pathname?.startsWith(`${route.href}/`));

                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center gap-x-2 text-sm font-medium px-3 py-3 rounded-lg transition-all",
                                // Light Mode Styles
                                "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                                // Dark Mode Styles (This fixes the text visibility)
                                "dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800",
                                // Active State (Darker background for active link)
                                isActive && "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                            )}
                        >
                            <route.icon
                                size={20}
                                className={cn(
                                    "text-gray-400 dark:text-gray-500",
                                    isActive && "text-gray-900 dark:text-gray-100"
                                )}
                            />
                            {route.label}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
