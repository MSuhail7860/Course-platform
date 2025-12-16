"use client";

import { LayoutDashboard, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/admin",
    },
    {
        icon: Users,
        label: "Users",
        href: "/admin/users",
    },
    {
        icon: BookOpen,
        label: "Courses",
        href: "/admin/courses",
    },
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full h-full border-r overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <span className="text-xl font-bold text-red-700">Admin Mode</span>
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
                                isActive && "text-red-700 bg-red-200/20 hover:bg-red-200/20 hover:text-red-700 decoration-red-700"
                            )}
                        >
                            <div className="flex items-center gap-x-2 py-4">
                                <route.icon size={22} className={cn("text-slate-500", isActive && "text-red-700")} />
                                {route.label}
                            </div>
                            <div className={cn(
                                "ml-auto opacity-0 border-2 border-red-700 h-full transition-all",
                                isActive && "opacity-100"
                            )} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
