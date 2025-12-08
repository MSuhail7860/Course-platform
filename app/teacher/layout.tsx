import { TeacherSidebar } from "./_components/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const TeacherLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 mt-16 bg-background border-r">
                <TeacherSidebar />
            </div>
            <main className="md:pl-56 pt-[10px] h-full">
                {children}
            </main>
        </div>
    );
}

export default TeacherLayout;
