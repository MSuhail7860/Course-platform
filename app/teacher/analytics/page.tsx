import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DollarSign, CreditCard } from "lucide-react";

import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(session.user.id);

    return (
        <div className="p-6 space-y-6">

            <div className="flex flex-col gap-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Overview of your financial performance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                    icon={<DollarSign className="h-4 w-4 text-gray-400" />}
                />
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                    icon={<CreditCard className="h-4 w-4 text-gray-400" />}
                />
            </div>

            {/* FIX: Changed bg-white to dark:bg-gray-900 */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                <Chart
                    data={data}
                />
            </div>
        </div>
    );
}

export default AnalyticsPage;