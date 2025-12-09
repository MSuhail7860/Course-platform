
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const session = await auth();
        const { chapterId } = await params;
        const { isCompleted } = await req.json();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: session.user.id,
                    chapterId: chapterId,
                }
            },
            update: {
                isCompleted,
            },
            create: {
                userId: session.user.id,
                chapterId: chapterId,
                isCompleted,
            }
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
