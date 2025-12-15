"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1),
});

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); // Added state for potential reordering updates

    const toggleCreating = () => setIsCreating((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created");
            toggleCreating();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        // FIX: Added dark:bg-slate-900 and dark:border-slate-800
        <div className="relative mt-6 border bg-slate-900 dark:bg-slate-900 rounded-md p-4 dark:border-slate-800">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center z-10">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between dark:text-slate-100">
                Course chapters
                <Button onClick={toggleCreating} variant="ghost" className="dark:text-slate-200 dark:hover:bg-slate-900">
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course'"
                                            {...field}
                                            // FIX: Dark mode input styles
                                            className="bg-white dark:bg-slate-950 dark:text-white dark:border-slate-800"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="dark:bg-slate-900 dark:text-slate-900"
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic",
                    // FIX: Dark mode text color
                    "dark:text-slate-300"
                )}>
                    {!initialData.chapters.length && "No chapters"}
                    {initialData.chapters.map((chapter) => (
                        <Link key={chapter.id} href={`/teacher/courses/${courseId}/chapters/${chapter.id}`} className="block mb-2">
                            <div className={cn(
                                "flex items-center gap-x-2 border rounded-md text-sm p-2 transition cursor-pointer",
                                // Light Mode Styles
                                "bg-slate-900 border-slate-200 text-slate-700 hover:bg-slate-300",
                                // Dark Mode Styles (FIXED)
                                "dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                            )}>
                                {chapter.title}
                                {chapter.isPublished && (
                                    <span className="ml-auto text-xs bg-sky-700 text-white px-2 py-1 rounded-full">
                                        Published
                                    </span>
                                )}
                                {!chapter.isPublished && (
                                    <span className="ml-auto text-xs bg-slate-500 text-white px-2 py-1 rounded-full">
                                        Draft
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4 dark:text-slate-400">
                    Drag and drop to reorder the chapters
                </p>
            )}
        </div>
    )
}