import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return redirect("/");
    }

    // Optional: Verify if the user is ADMIN before fetching
    // For now, we'll fetch all users
    const users = await db.user.findMany({});

    return users;
};
