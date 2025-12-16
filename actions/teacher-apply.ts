"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function applyForTeacher() {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return { error: "Unauthorized" };
        }

        const existingRequest = await db.teacherRequest.findFirst({
            where: {
                userId,
                status: "PENDING",
            },
        });

        if (existingRequest) {
            return { error: "You already have a pending request." };
        }

        await db.teacherRequest.create({
            data: {
                userId,
                status: "PENDING",
            },
        });

        revalidatePath("/teacher/apply");
        return { success: "Application submitted successfully!" };
    } catch (error) {
        console.error("Teacher application error:", error);
        return { error: "Something went wrong." };
    }
}
