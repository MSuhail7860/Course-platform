"use client";

import { LayoutDashboard, List } from "lucide-react";
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
        icon: LayoutDashboard,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

export const TeacherSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full h-full border-r overflow-y-auto bg-background shadow-sm">
            <div className="p-6">
                <span className="text-xl font-bold">Teacher Mode</span>
            </div>
            <div className="flex flex-col w-full">
                {routes.map((route) => {
                    const isActive = (pathname === route.href) || (pathname?.startsWith(`${route.href}/`));

                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 decoration-sky-700"
                            )}
                        >
                            <div className="flex items-center gap-x-2 py-4">
                                <route.icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
                                {route.label}
                            </div>
                            <div className={cn(
                                "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                                isActive && "opacity-100"
                            )} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
