import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RequestItem } from "./_components/request-item"; // We will create this next

export default async function AdminRequestsPage() {
    const session = await auth();
    const userId = session?.user?.id;

    // 1. Protect the Route
    if (!userId) return redirect("/");

    const currentUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (currentUser?.role !== "ADMIN") {
        return redirect("/"); // Kick them out if not Admin
    }

    // 2. Fetch Pending Requests
    const requests = await db.teacherRequest.findMany({
        where: {
            status: "PENDING",
        },
        include: {
            user: true, // Include user details to show email/name
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Teacher Access Requests</h1>

            {requests.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">
                    No pending requests found.
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <RequestItem
                            key={request.id}
                            request={request}
                            email={request.user.email || ""}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}