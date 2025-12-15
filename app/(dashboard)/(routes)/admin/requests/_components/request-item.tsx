"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateTeacherStatus } from "@/actions/teacher-approval";

// Define the type (simplified)
interface RequestItemProps {
    request: {
        id: string;
        bio: string | null;
        experience: string | null;
        linkedIn: string | null;
    };
    email: string;
}

export const RequestItem = ({ request, email }: RequestItemProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (approve: boolean) => {
        setIsLoading(true);
        try {
            const response = await updateTeacherStatus(request.id, approve);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.success);
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded-md shadow-sm bg-white flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">

            {/* User Info */}
            <div className="space-y-1">
                <h3 className="font-semibold text-lg">{email}</h3>
                <p className="text-sm text-slate-600"><span className="font-medium">Bio:</span> {request.bio}</p>
                <p className="text-sm text-slate-600"><span className="font-medium">Experience:</span> {request.experience}</p>
                {request.linkedIn && (
                    <a href={request.linkedIn} target="_blank" className="text-xs text-blue-600 hover:underline">
                        View LinkedIn
                    </a>
                )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-x-2">
                <button
                    onClick={() => handleAction(false)} // Reject
                    disabled={isLoading}
                    className="px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                >
                    Reject
                </button>
                <button
                    onClick={() => handleAction(true)} // Approve
                    disabled={isLoading}
                    className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    Approve
                </button>
            </div>
        </div>
    );
};
