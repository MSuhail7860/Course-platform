
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { VideoPlayer } from "@/components/video-player";
import { CourseProgressButton } from "@/components/course-progress-button";
import { Separator } from "@/components/ui/separator";
import { CourseEnrollButton } from "@/components/course-enroll-button";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string }
}) => {
    let session;
    try {
        session = await auth();
    } catch {
        session = null;
    }
    const { courseId, chapterId } = await params;

    if (!session?.user?.id) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
            isPublished: true,
        }
    });

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        select: {
            price: true,
        }
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    let purchase = null;

    if (course.price) {
        purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId: courseId,
                }
            }
        });
    }

    const isLocked = !chapter.isFree && !purchase && course.price !== null;

    const userProgress = await db.userProgress.findUnique({
        where: {
            userId_chapterId: {
                userId: session.user.id,
                chapterId: chapterId,
            }
        }
    });

    const nextChapter = await db.chapter.findFirst({
        where: {
            courseId: courseId,
            isPublished: true,
            position: {
                gt: chapter.position,
            },
        },
        orderBy: {
            position: "asc",
        }
    });

    const isCompleted = !!userProgress?.isCompleted;
    const completeOnEnd = !!purchase && !isCompleted;

    return (
        <div>
            {/* 
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      */}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={chapterId}
                        courseId={courseId}
                        nextChapterId={nextChapter?.id}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        videoUrl={chapter.videoUrl!}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase || !course.price ? (
                            <CourseProgressButton
                                chapterId={chapterId}
                                courseId={courseId}
                                nextChapterId={nextChapter?.id}
                                isCompleted={isCompleted}
                            />
                        ) : (
                            <CourseEnrollButton
                                courseId={courseId}
                                price={course.price!}
                            />
                        )}
                    </div>
                    <Separator />
                    <div className="p-4">
                        <div className="text-sm text-slate-700">
                            <p>{chapter.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterIdPage;
