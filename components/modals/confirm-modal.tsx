"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
};

export const ConfirmModal = ({
    children,
    onConfirm
}: ConfirmModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-slate-950 dark:border-slate-800">
                <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-slate-100">
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="dark:text-slate-400">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-900 dark:border-slate-800">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="dark:bg-slate-900 dark:text-slate-900 dark:hover:bg-slate-900">
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};