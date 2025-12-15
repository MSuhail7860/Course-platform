"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: {
        price: number | null;
    };
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number().optional(),
});

export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            price: initialData.price || undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        // FIX: Added dark:bg-slate-900 and dark:border-slate-800
        <div className="mt-6 border bg-slate-900 dark:bg-slate-900 rounded-md p-4 dark:border-slate-800">
            <div className="font-medium flex items-center justify-between dark:text-slate-100">
                Course price
                <Button onClick={toggleEdit} variant="ghost" className="dark:text-slate-200 dark:hover:bg-slate-900">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit price
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.price && "text-slate-500 italic",
                    // FIX: Dark mode text color
                    "dark:text-slate-300"
                )}>
                    {initialData.price
                        ? formatPrice(initialData.price)
                        : "No price"
                    }
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="Set a price for your course"
                                            {...field}
                                            value={field.value ?? ""}
                                            // FIX: Dark mode input styles
                                            className="bg-white dark:bg-slate-950 dark:text-white dark:border-slate-800"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                className="dark:bg-slate-900 dark:text-slate-900"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}