"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Update the user's role
        const updatedUser = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                role: newRole,
            },
        });

        revalidatePath("/admin/users");
        return updatedUser;
    } catch (error) {
        console.log("[UPDATE_USER_ROLE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};
