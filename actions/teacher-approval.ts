"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function approveTeacherRequest(requestId: string) {
    try {
        const session = await auth();

        // Strict Admin Check
        if (session?.user?.role !== "ADMIN") {
            return { error: "Unauthorized" };
        }

        const request = await db.teacherRequest.findUnique({
            where: { id: requestId },
        });

        if (!request) {
            return { error: "Request not found" };
        }

        // Transaction to update request and user role
        await db.$transaction([
            db.teacherRequest.update({
                where: { id: requestId },
                data: { status: "APPROVED" },
            }),
            db.user.update({
                where: { id: request.userId },
                data: { role: "TEACHER" },
            }),
        ]);

        revalidatePath("/admin/requests");
        return { success: "Request approved and user promoted to Teacher." };
    } catch (error) {
        console.error("Approval error:", error);
        return { error: "Something went wrong" };
    }
}

export async function rejectTeacherRequest(requestId: string) {
    try {
        const session = await auth();

        if (session?.user?.role !== "ADMIN") {
            return { error: "Unauthorized" };
        }

        await db.teacherRequest.update({
            where: { id: requestId },
            data: { status: "REJECTED" },
        });

        revalidatePath("/admin/requests");
        return { success: "Request rejected." };
    } catch (error) {
        console.error("Rejection error:", error);
        return { error: "Something went wrong" };
    }
}
