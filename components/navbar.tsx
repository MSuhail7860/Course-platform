import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth, signIn, signOut } from "@/auth"
import { ModeToggle } from "@/components/mode-toggle"

export default async function Navbar() {
    let session;
    try {
        session = await auth();
    } catch {
        session = null;
    }

    return (
        // CHANGE HERE: Added "relative z-[200]" to force it above the confetti
        <nav className="border-b bg-background h-16 flex items-center px-4 container mx-auto relative z-[200]">
            <div className="flex-1">
                <Link href="/" className="font-bold text-xl">CoursePlatform</Link>
            </div>

            <div className="flex items-center gap-x-2">

                <ModeToggle />

                {session ? (
                    <div className="flex items-center gap-x-2">
                        <Link href="/search">
                            <Button size="sm" variant="ghost">
                                Browse
                            </Button>
                        </Link>
                        {session.user?.role === "TEACHER" || session.user?.role === "ADMIN" ? (
                            <Link href="/teacher/courses">
                                <Button size="sm" variant="ghost">
                                    Teacher Mode
                                </Button>
                            </Link>
                        ) : null}
                        {session.user?.role === "ADMIN" ? (
                            <Link href="/admin/users">
                                <Button size="sm" variant="ghost">
                                    Admin Mode
                                </Button>
                            </Link>
                        ) : null}
                        {session.user?.role === "STUDENT" ? (
                            <Link href="/teacher/apply">
                                <Button size="sm" variant="ghost">
                                    Apply for Teacher
                                </Button>
                            </Link>
                        ) : null}
                        <span className="text-sm font-medium mr-2">
                            {session.user?.email} ({session.user?.role})
                        </span>
                        <form action={async () => {
                            "use server"
                            await signOut()
                        }}>
                            <Button type="submit" variant="ghost">Sign Out</Button>
                        </form>
                    </div>
                ) : (
                    <div className="flex gap-x-2">
                        <Link href="/auth/register">
                            <Button size="sm" variant="ghost">
                                Register
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button size="sm">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
