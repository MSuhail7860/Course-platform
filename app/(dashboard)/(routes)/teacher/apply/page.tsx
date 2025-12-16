"use client";

import { applyForTeacher } from "@/actions/teacher-apply";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TeacherApplyPage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onApply = () => {
        startTransition(() => {
            applyForTeacher()
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success(data.success);
                        router.refresh();
                    }
                })
        });
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Apply to be a Teacher</h1>
            <p className="text-slate-600 mb-8">
                Teachers can create and manage courses. Apply now to start teaching!
            </p>
            <div className="flex items-center gap-x-2">
                <Button
                    onClick={onApply}
                    disabled={isPending}
                >
                    Submit Application
                </Button>
            </div>
        </div>
    );
}
