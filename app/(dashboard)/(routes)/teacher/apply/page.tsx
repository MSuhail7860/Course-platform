"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyForTeacher } from "@/actions/teacher-apply";
import { toast } from "sonner";

export default function TeacherApplyPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        bio: "",
        experience: "",
        linkedIn: "",
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await applyForTeacher(formData);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success("Application submitted!");
                router.push("/"); // Redirect to home or dashboard
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Apply to be a Teacher</h1>
            <p className="text-slate-500 mb-8">
                Tell us about yourself. Once approved, you will be able to create courses.
            </p>

            <form onSubmit={onSubmit} className="space-y-6">

                {/* Bio Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Bio / About You</label>
                    <textarea
                        required
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="I am a software engineer with..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                </div>

                {/* Experience Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Experience</label>
                    <textarea
                        required
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="5 years of experience in..."
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                </div>

                {/* LinkedIn Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn Profile (Optional)</label>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    />
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}