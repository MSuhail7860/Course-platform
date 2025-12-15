import { auth } from "@/auth";
import { SidebarRoutes } from "./sidebar-routes";
import { db } from "@/lib/db"; // Make sure this path to your db matches your project

export const Sidebar = async () => {
    // 1. Get the current user's ID
    const session = await auth();
    const userId = session?.user?.id;

    // 2. If logged in, find their role in the database
    const user = userId
        ? await db.user.findUnique({ where: { id: userId } })
        : null;

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                {/* You can put your Logo component here if you have one */}
                <span className="font-bold text-xl">Course App</span>
            </div>
            <div className="flex flex-col w-full">
                {/* 3. Pass the role (e.g., "ADMIN") down to the routes */}
                <SidebarRoutes role={user?.role} />
            </div>
        </div>
    );
}