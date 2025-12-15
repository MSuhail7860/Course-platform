"use client";

import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "courseImage" | "courseAttachment" | "chapterVideo";
}

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            onChange(response.data.url);
            toast.success("File uploaded");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,

        accept: endpoint === "chapterVideo"
            ? { 'video/mp4': ['.mp4', '.mkv', '.webm'] }
            : endpoint === "courseImage"
                ? { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }
                : undefined
    });

    return (
        <div
            {...getRootProps()}
            className="border-dashed border-2 border-slate-300 p-10 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition"
        >
            <input {...getInputProps()} />
            <UploadCloud className="h-10 w-10 text-slate-500 mb-2" />
            <div className="text-slate-500 text-sm">
                {isLoading ? "Uploading..." : isDragActive ? "Drop the file here" : "Click or drag file to upload"}
            </div>
        </div>
    );
}
