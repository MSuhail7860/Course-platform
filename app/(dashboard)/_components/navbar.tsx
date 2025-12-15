"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Assuming you use this for mobile

export const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession(); // This gets your login data

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isAdminPage = pathname?.startsWith("/admin");

    return (
        <div className="flex items-center h-[80px] px-6 border-b bg-background shadow-sm z-50">

            {/* Mobile Sidebar Trigger (Optional - keep if you have Sidebar) */}
            <div className="md:hidden pr-4">
                <Menu className="h-6 w-6" />
            </div>

            {/* Right Side Actions */}
            <div className="ml-auto flex gap-x-2 items-center">

                {/* Teacher Mode Logic */}
                {isTeacherPage || isAdminPage ? (
                    <Link href="/">
                        <button className="flex items-center text-sm font-medium hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition">
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <button className="text-sm font-medium hover:bg-accent hover:text-accent-foreground px-4 py-2 border rounded-md transition">
                            Teacher Mode
                        </button>
                    </Link>
                )}

                <ModeToggle />

                {/* --- LOGIN / USER BUTTON --- */}
                {session?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none ml-2">
                            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300 hover:shadow-md transition">
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-bold text-slate-700">
                                        {session.user.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                )}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {session.user.name && (
                                        <p className="font-medium">{session.user.name}</p>
                                    )}
                                    {session.user.email && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/api/auth/signin">
                        <button className="bg-black text-white px-4 py-2 rounded-md text-sm ml-2 hover:bg-gray-800 transition">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};