"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    videoUrl: string;
};

export const VideoPlayer = ({
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    videoUrl,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    // Mock function to handle end
    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                if (!nextChapterId) {
                    toast.success("Course completed!");
                    router.refresh();
                }

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="relative aspect-video">
            {/* Loading state can be handled if we had a player loading event. 
          For simple video tag, it's virtually instant or shows native loader. 
      */}
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && (
                <video
                    src={videoUrl}
                    controls
                    className={cn(
                        "w-full h-full rounded-md",
                        !isReady && "hidden"
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    autoPlay
                >
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    )
}
