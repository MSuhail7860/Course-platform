
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "@/components/course-sidebar";
import Navbar from "@/components/navbar"; // Reuse main navbar for now

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {
    const session = await auth();
    const { courseId } = await params;

    if (!session?.user?.id) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId: session.user.id,
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(session.user.id, course.id);

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                {/* We can potentially simplify Navbar for student view or keep global */}
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 mt-16">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout;
