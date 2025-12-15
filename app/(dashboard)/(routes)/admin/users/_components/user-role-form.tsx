"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserRole } from "@/actions/update-user-role";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface UserRoleFormProps {
    userId: string;
    currentRole: string;
}

export const UserRoleForm = ({ userId, currentRole }: UserRoleFormProps) => {
    const router = useRouter();
    const [role, setRole] = useState(currentRole);
    const [isLoading, setIsLoading] = useState(false);

    const onRoleChange = async (newRole: string) => {
        try {
            setIsLoading(true);
            setRole(newRole);
            await updateUserRole(userId, newRole);
            toast.success("User role updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
            // Revert role on error if needed, or rely on refresh
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Select
            disabled={isLoading}
            onValueChange={onRoleChange}
            defaultValue={String(role)} // Ensure it's a string
            value={String(role)}
        >
            <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="TEACHER">Teacher</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
        </Select>
    );
};
