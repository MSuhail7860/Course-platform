import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AdminUsersPage = async () => {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const users = await db.user.findMany({
        orderBy: {
            email: "asc",
        },
    });

    return (
        <div className="p-6">
            {/* Added dark:text-white to ensure heading is visible */}
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Users</h1>

            {/* Added dark:bg-neutral-900 and dark:border-neutral-800 to fix the white box */}
            <div className="border rounded-md p-4 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                <Table>
                    <TableHeader>
                        <TableRow className="dark:border-neutral-800">
                            <TableHead className="dark:text-slate-300">Email</TableHead>
                            <TableHead className="dark:text-slate-300">Role</TableHead>
                            <TableHead className="dark:text-slate-300">User ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                                <TableCell className="dark:text-slate-200">{user.email}</TableCell>
                                <TableCell className="dark:text-slate-200">{user.role}</TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground dark:text-neutral-500">
                                    {user.id}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 dark:text-neutral-500">
                * To change roles, please access the database directly for now or I can add a server action if requested.
            </p>
        </div>
    );
}

export default AdminUsersPage;