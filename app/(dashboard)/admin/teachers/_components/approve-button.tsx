"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming you use Sonner or similar
import { approveTeacher } from "@/actions/manage-teachers";
import { Check } from "lucide-react";

interface ApproveButtonProps {
    userId: string;
}

export const ApproveButton = ({ userId }: ApproveButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            approveTeacher(userId)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Button
            onClick={onClick}
            disabled={isPending}
            size="sm"
            className="bg-sky-700 hover:bg-sky-600 text-white"
        >
            <Check className="h-4 w-4 mr-2" />
            Approve
        </Button>
    );
};