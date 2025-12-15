import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import your new Card component
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FilePlus, BookOpen } from "lucide-react"; // Import Icons

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
        <div className="p-6 space-y-6">
            {/* Header - Only show if there are courses (otherwise the empty state handles the button) */}
            {courses.length > 0 && (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <Link href="/teacher/create">
                        <Button>
                            New Course
                        </Button>
                    </Link>
                </div>
            )}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <Link key={course.id} href={`/teacher/courses/${course.id}`} className="block group">
                        {/* Use the new Card component for consistent look */}
                        <Card className="h-full border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                            <CardHeader className="p-4 pb-2">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                </div>
                                <CardTitle className="line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {course.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="text-sm text-gray-500 font-medium">
                                    {course.isPublished ? (
                                        <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-xs">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                            Draft
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {/* PRO EMPTY STATE: Shows when 0 courses exist */}
                {courses.length === 0 && (
                    <div className="col-span-full h-[60vh] flex flex-col items-center justify-center space-y-4 rounded-3xl bg-white border border-dashed border-gray-300">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <FilePlus className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="text-xl font-bold text-gray-900">
                                No courses created yet
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                You haven&apos;t created any courses. Start by adding your first course to share your knowledge.
                            </p>
                        </div>
                        <Link href="/teacher/create">
                            <Button size="lg" className="mt-4">
                                Create New Course
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;
