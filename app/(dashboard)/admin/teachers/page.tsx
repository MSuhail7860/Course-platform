import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ApproveButton } from "./_components/approve-button";

export default async function TeachersPage() {
    const session = await auth();

    // Security Gate
    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    // Fetch only regular users (You can add more filters later)
    const users = await db.user.findMany({
        where: {
            role: "USER",
        },
        orderBy: {
            email: "asc", // or createdAt: "desc"
        }
    });

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-medium">Manage Teacher Access</h1>
                <p className="text-sm text-slate-500">
                    Current Applicants: {users.length}
                </p>
            </div>

            <div className="border rounded-md">
                {users.length === 0 && (
                    <div className="p-10 text-center text-sm text-muted-foreground">
                        No users found.
                    </div>
                )}

                {/* Simple List of Users */}
                <div className="divide-y">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-slate-900">
                                    {user.email}
                                </span>
                                <span className="text-xs text-slate-500">
                                    ID: {user.id}
                                </span>
                            </div>

                            <ApproveButton userId={user.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}