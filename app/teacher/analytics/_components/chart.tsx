"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip, // Added Tooltip for interactivity
} from "recharts";

import { Card } from "@/components/ui/card";

interface ChartProps {
    data: {
        name: string;
        total: number;
    }[];
}

export const Chart = ({
    data
}: ChartProps) => {
    return (
        // Added border-none and shadow-none because we already wrapped it in a container on the main page
        <Card className="border-none shadow-none">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    {/* Added Tooltip so users can see values on hover */}
                    <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Bar
                        dataKey="total"
                        fill="#1f2937" // Changed from Blue to Dark Gray (Professional Look)
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
