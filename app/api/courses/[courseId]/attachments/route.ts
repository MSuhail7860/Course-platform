import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const session = await auth();
        const { id: userId } = session?.user || {};
        const { url } = await req.json();

        // Await params as per Next.js 15+ / 16 expectation for async params, 
        // though safe to just await to be sure if version is ambiguous
        const { courseId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: courseId,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}