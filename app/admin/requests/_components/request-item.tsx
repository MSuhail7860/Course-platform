"use client";

import { approveTeacherRequest, rejectTeacherRequest } from "@/actions/teacher-approval";
import { Button } from "@/components/ui/button";
import { TeacherRequest, User } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RequestItemProps {
    request: TeacherRequest & { user: User };
}

export const RequestItem = ({ request }: RequestItemProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onApprove = () => {
        startTransition(() => {
            approveTeacherRequest(request.id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    else {
                        toast.success(data.success);
                        router.refresh();
                    }
                });
        });
    };

    const onReject = () => {
        startTransition(() => {
            rejectTeacherRequest(request.id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    else {
                        toast.success(data.success);
                        router.refresh();
                    }
                });
        });
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-md shadow-sm">
            <div>
                <p className="font-semibold">{request.user.email}</p>
                <p className="text-sm text-slate-500">Applied on: {new Date(request.createdAt).toLocaleDateString()}</p>
                <p className="text-sm">Status: <span className={
                    request.status === "APPROVED" ? "text-green-600 font-bold" :
                        request.status === "REJECTED" ? "text-red-600 font-bold" :
                            "text-yellow-600 font-bold"
                }>{request.status}</span></p>
            </div>
            {request.status === "PENDING" && (
                <div className="flex items-center gap-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onReject}
                        disabled={isPending}
                        className="text-red-500 hover:text-red-600"
                    >
                        Reject
                    </Button>
                    <Button
                        size="sm"
                        onClick={onApprove}
                        disabled={isPending}
                    >
                        Approve
                    </Button>
                </div>
            )}
        </div>
    );
}
