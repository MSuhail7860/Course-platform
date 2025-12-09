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
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <div className="border rounded-md p-4 bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>User ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
                * To change roles, please access the database directly for now or I can add a server action if requested.
            </p>
        </div>
     );
}
 
export default AdminUsersPage;
