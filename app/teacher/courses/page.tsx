import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Courses</h1>
                <Link href="/teacher/create">
                    <Button>
                        New Course
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses.map((course) => (
                    <Link key={course.id} href={`/teacher/courses/${course.id}`} className="block">
                        <div className="border rounded-md p-4 hover:shadow-sm transition bg-card text-card-foreground">
                            <div className="font-medium truncate">{course.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {course.isPublished ? "Published" : "Draft"}
                            </div>
                        </div>
                    </Link>
                ))}
                {courses.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground mt-10">
                        No courses found
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;
