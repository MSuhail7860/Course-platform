"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an online error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h2 className="text-xl font-bold">Something went wrong!</h2>
            <p className="text-slate-500">
                We couldn't load the courses. Please try again later.
            </p>
            {/* Optionally display a hint if it's a database connection error */}
            {(error.message.includes("Can't reach database") || error.message.includes("connect")) && (
                <p className="text-sm text-red-500 bg-red-100 p-2 rounded">
                    Database connection failed. Please check your internet or database status.
                </p>
            )}
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="bg-black text-white px-4 py-2 rounded hover:bg-slate-800 transition"
            >
                Try again
            </button>
        </div>
    );
}
