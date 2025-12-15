"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
    icon?: React.ReactNode;
}

export const DataCard = ({
    value,
    label,
    shouldFormat,
    icon,
}: DataCardProps) => {
    return (
        <Card className="hover:shadow-md transition-all duration-200 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    {label}
                </CardTitle>
                {/* FIXED: Simply render the icon node passed from the parent */}
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                    {shouldFormat ? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    )
}