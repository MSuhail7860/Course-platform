"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const updateTeacherStatus = async (requestId: string, approve: boolean) => {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        // 1. Security Check: Is the current user an Admin?
        const adminUser = await db.user.findUnique({
            where: { id: userId || "" }
        });

        if (!adminUser || adminUser.role !== "ADMIN") {
            return { error: "Unauthorized: Admin access required" };
        }

        // 2. Fetch the request to get the applicant's User ID
        const request = await db.teacherRequest.findUnique({
            where: { id: requestId }
        });

        if (!request) return { error: "Request not found" };

        if (approve) {
            // APPROVE: Transaction to update Request AND User Role
            await db.$transaction([
                db.teacherRequest.update({
                    where: { id: requestId },
                    data: { status: "APPROVED" }
                }),
                db.user.update({
                    where: { id: request.userId },
                    data: { role: "TEACHER" }
                })
            ]);
        } else {
            // REJECT: Just update the request status
            await db.teacherRequest.update({
                where: { id: requestId },
                data: { status: "REJECTED" }
            });
        }

        revalidatePath("/admin/requests"); // Refresh the page automatically
        return { success: approve ? "Teacher approved!" : "Application rejected." };

    } catch (error) {
        console.log("[TEACHER_APPROVAL]", error);
        return { error: "Something went wrong" };
    }
};