"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card"; // Import Card to wrap the form

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const CreatePage = () => {
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
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created");
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div className="w-full max-w-2xl"> {/* Constrain width for better focus */}

                {/* Header Section */}
                <div className="mb-8 space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Name your course
                    </h1>
                    <p className="text-gray-500">
                        What would you like to name your course? Don&apos;t worry, you can change this later.
                    </p>
                </div>

                {/* Form Wrapped in Card */}
                <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Course Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="e.g. 'Advanced Web Development'"
                                                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" // Subtle background shift on focus
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-400">
                                                What will you teach in this course?
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-x-2 pt-2">
                                    <Link href="/">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="text-gray-500 hover:text-gray-900"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="bg-gray-900 hover:bg-gray-800 text-white" // Explicitly dark button
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default CreatePage;
