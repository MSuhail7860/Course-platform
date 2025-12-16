import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { RequestItem } from "./_components/request-item";

export default async function AdminRequestsPage() {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const requests = await db.teacherRequest.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
        }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Teacher Requests</h1>
            <div className="space-y-4">
                {requests.length === 0 && (
                    <div className="text-center text-slate-500">
                        No requests found
                    </div>
                )}
                {requests.map((request) => (
                    <RequestItem
                        key={request.id}
                        request={request}
                    />
                ))}
            </div>
        </div>
    );
}
