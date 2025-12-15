import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; attachmentId: string }> }
) {
    try {
        const session = await auth();
        const { id: userId } = session?.user || {};
        // Await params as per Next.js 15+ / 16 expectation
        const { courseId, attachmentId } = await params;

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

        const attachment = await db.attachment.delete({
            where: {
                courseId: courseId,
                id: attachmentId,
            },
        });

        // Attempt to delete the file from the filesystem if it's a local upload
        if (attachment.url.startsWith("/uploads/")) {
            try {
                const fileName = attachment.url.substring("/uploads/".length);
                const filePath = path.join(process.cwd(), "public", "uploads", fileName);
                await unlink(filePath);
            } catch (fileError) {
                console.error("Failed to delete file from filesystem:", fileError);
                // We don't fail the request if file deletion fails, as the DB entry is gone
            }
        }

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
