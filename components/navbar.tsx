"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isAdminPage = pathname?.startsWith("/admin");
    const isPlayerPage = pathname?.includes("/chapter");

    const isAuthPage = pathname?.startsWith("/auth");

    if (isPlayerPage || isAuthPage) return null;

    return (
        <div className="p-4 border-b flex items-center bg-background shadow-sm">

            {/* Mobile Menu Trigger */}
            <div className="md:hidden pr-4">
                <Menu />
            </div>

            {/* Logo */}
            <Link href="/" className="font-bold text-xl flex items-center mr-auto hover:opacity-75 transition">
                CoursePlatform
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-x-2 ml-auto">

                {/* --- 1. ADMIN MODE BUTTON (Only if logged in) --- */}
                {session?.user && (
                    <>
                        {isAdminPage || isTeacherPage ? (
                            <Link href="/">
                                <Button size="sm" variant="ghost">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Exit
                                </Button>
                            </Link>
                        ) : session.user.role === "ADMIN" ? (
                            <Link href="/teacher/courses">
                                <Button size="sm" variant="ghost">
                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                    Admin Mode
                                </Button>
                            </Link>
                        ) : null}
                    </>
                )}

                <ModeToggle />

                {/* --- 2. AUTH BUTTONS --- */}
                {status === "loading" ? (
                    <div className="h-8 w-8 rounded-full bg-slate-100 animate-pulse" />
                ) : session?.user ? (
                    // LOGGED IN: Show Profile
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="h-10 w-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden hover:shadow-md transition">
                                {session.user.image ? (
                                    <img src={session.user.image} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-lg font-bold text-slate-700">
                                        {session.user.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                )}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="p-2 text-sm text-gray-500 font-medium border-b mb-1">
                                {session.user.email} <br />
                                <span className="text-xs font-bold text-blue-600">{session.user.role}</span>
                            </div>
                            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-600">
                                <LogOut className="h-4 w-4 mr-2" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // GUEST: Show Register & Sign In
                    <div className="flex gap-x-2">
                        <Button size="sm" variant="default" asChild>
                            <Link href="/auth/register">
                                Register
                            </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/auth/login">
                                Sign In
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
