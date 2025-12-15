"use client";

import { Category } from "@prisma/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils"; // Make sure this path matches your project

interface CategoriesProps {
    items: Category[];
}

export const Categories = ({ items }: CategoriesProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const onClick = (id: string) => {
        const isSelected = currentCategoryId === id;

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : id, // Toggle: Remove if selected, add if not
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onClick(item.id)}
                    className={cn(
                        "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-slate-200 dark:bg-slate-800 hover:opacity-75 transition",
                        currentCategoryId === item.id && "bg-sky-700 text-white hover:opacity-100"
                    )}
                    type="button"
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};