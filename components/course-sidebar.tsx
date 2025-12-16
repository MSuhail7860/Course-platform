
import { auth } from "@/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { CourseSidebarItem } from "./course-sidebar-item";
import { Progress } from "@/components/ui/progress";

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
};

export const CourseSidebar = async ({
    course,
    progressCount,
}: CourseSidebarProps) => {
    let session;
    try {
        session = await auth();
    } catch {
        session = null;
    }

    // Basic check, in real app more robust access control needed here too
    // But strictly sidebar just renders links. Access is checked on page load.
    if (!session?.user?.id) {
        return redirect("/");
    }

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {/* Simple progress bar */}
                <div className="mt-10">
                    <Progress value={progressCount} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {Math.round(progressCount)}% Complete
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !session.user} // TODO: Update logic when Purchase model is fully integrated
                    />
                ))}
            </div>
        </div>
    )
}
