"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const approveTeacher = async (userId: string) => {
    try {
        // 1. Security Check: Ensure current user is an Admin
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return { error: "Unauthorized" };
        }

        // 2. Update the target user's role
        await db.user.update({
            where: { id: userId },
            data: { role: "TEACHER" },
        });

        // 3. Refresh the UI so the user disappears from the list
        revalidatePath("/admin/teachers");
        return { success: "User updated to Teacher!" };

    } catch (error) {
        return { error: "Something went wrong" };
    }
};