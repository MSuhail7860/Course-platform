"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
// Ensure this points to the provider file where we defined the hook/store earlier
import { useConfettiStore } from "@/components/providers/confetti-provider";

interface CourseActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const CourseActions = ({
    disabled,
    courseId,
    isPublished
}: CourseActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen(); // Triggers the confetti animation
            }

            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            // Outline variant usually adapts well to dark mode automatically
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button size="sm" variant="destructive" disabled={isLoading} onClick={onDelete}>
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    )
}
