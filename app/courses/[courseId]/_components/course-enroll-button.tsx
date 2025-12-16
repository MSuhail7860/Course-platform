"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/actions/checkout"; // Import your new action
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui
import { toast } from "sonner";

interface CourseEnrollButtonProps {
    priceId: string;
    courseId: string;
}

export const CourseEnrollButton = ({
    priceId,
    courseId,
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            // 1. Call the Server Action
            const response = await createCheckoutSession({ priceId, courseId });

            // 2. Redirect user to Stripe
            if (response.url) {
                window.location.assign(response.url);
            }

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={onClick} disabled={isLoading} size="lg" className="w-full">
            Enroll for $29
        </Button>
    );
};