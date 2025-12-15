import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react"; // Added missing icons

import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { CourseActions } from "./_components/course-actions";

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string }
}) => {
    const session = await auth();
    // Await params if using Next.js 15+, otherwise access directly
    const { courseId } = await params;

    if (!session?.user?.id) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId: session.user.id
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    // 1. Fetch Categories for the dropdown
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    {/* FIX: Added dark mode text color */}
                    <h1 className="text-2xl font-medium dark:text-slate-100">
                        Course setup
                    </h1>
                    <span className="text-sm text-slate-700 dark:text-slate-400">
                        Complete all fields {completionText}
                    </span>
                </div>
                <CourseActions
                    disabled={!isComplete}
                    courseId={course.id}
                    isPublished={course.isPublished}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl font-medium dark:text-slate-100">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl font-medium dark:text-slate-100">
                                Course chapters
                            </h2>
                        </div>
                        <ChaptersForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-xl font-medium dark:text-slate-100">
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    {/* FIX: Added missing Attachment/Resources section */}
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-xl font-medium dark:text-slate-100">
                                Resources & Attachments
                            </h2>
                        </div>
                        <AttachmentForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;
