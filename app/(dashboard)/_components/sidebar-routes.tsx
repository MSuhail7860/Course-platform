"use client";

import { BarChart, Compass, Layout, List, ShieldCheck, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

// 1. Define routes for Students (Guests)
const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

// 2. Define routes for Teachers
const teacherRoutes = [
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

// 3. Define routes for ADMINS (New!)
const adminRoutes = [
    {
        icon: Layout,
        label: "Admin Dashboard",
        href: "/admin/dashboard",
    },
    {
        icon: Users,
        label: "Manage Teachers", // Page to approve teacher requests
        href: "/admin/teachers",
    },
    // You can add more admin links here later (e.g., Settings, Billing)
];

interface SidebarRoutesProps {
    role?: string; // Receive the role prop we passed from Sidebar
}

export const SidebarRoutes = ({ role }: SidebarRoutesProps) => {
    // 4. Select the correct list based on the role
    let routes = guestRoutes;

    if (role === "TEACHER") {
        routes = teacherRoutes;
    } else if (role === "ADMIN") {
        routes = adminRoutes;
    }

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};