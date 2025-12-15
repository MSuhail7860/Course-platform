"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const applyForTeacher = async (values: { bio: string; experience: string; linkedIn?: string }) => {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return { error: "Unauthorized" };
        }

        // Check if they already applied
        const existingRequest = await db.teacherRequest.findUnique({
            where: { userId },
        });

        if (existingRequest) {
            return { error: "You have already applied. Please wait for approval." };
        }

        // Create the request
        await db.teacherRequest.create({
            data: {
                userId,
                bio: values.bio,
                experience: values.experience,
                linkedIn: values.linkedIn,
                status: "PENDING",
            },
        });

        return { success: "Application submitted! An admin will review it shortly." };

    } catch (error) {
        console.log("[TEACHER_APPLY]", error);
        return { error: "Something went wrong" };
    }
};