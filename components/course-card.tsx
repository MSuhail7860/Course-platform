"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string | null; // Updated to allow null (in case image is missing)
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string | undefined;
};

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">

                {/* IMAGE CONTAINER */}
                <div className="relative w-full aspect-video rounded-md overflow-hidden bg-slate-200 dark:bg-slate-800">
                    {imageUrl ? (
                        <Image
                            fill
                            className="object-cover"
                            alt={title}
                            src={imageUrl}
                        />
                    ) : (
                        // Fallback: If no image exists, show a centered Icon
                        <div className="flex items-center justify-center h-full w-full bg-slate-200 dark:bg-slate-800">
                            <BookOpen className="h-10 w-10 text-slate-500" />
                        </div>
                    )}
                </div>

                {/* DETAILS CONTAINER */}
                <div className="flex flex-col pt-2">
                    {/* Title */}
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 dark:group-hover:text-sky-500 transition line-clamp-2 text-slate-700 dark:text-slate-100">
                        {title}
                    </div>

                    {/* Category */}
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>

                    {/* Chapters Badge */}
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-300">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>

                    {/* Price or Progress */}
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-200">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}
