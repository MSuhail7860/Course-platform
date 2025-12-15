import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUsers } from "@/actions/get-users";
import { UserRoleForm } from "./_components/user-role-form";

const AdminUsersPage = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || session.user.role !== "ADMIN") {
        return redirect("/");
    }

    const users = await getUsers();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <div className="border rounded-md">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 border-b">
                        <tr className="text-left">
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Access</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900 transition">
                                <td className="p-4">
                                    <div className="font-medium">{user.email}</div>
                                    <div className="text-xs text-muted-foreground">{user.id}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`
                                        px-2 py-1 rounded-full text-xs font-semibold
                                        ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                                            user.role === "TEACHER" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" :
                                                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
                                    `}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    {user.role === "ADMIN" && "Full Access"}
                                    {user.role === "TEACHER" && "Can Edit"}
                                    {user.role === "STUDENT" && "Can View"}
                                </td>
                                <td className="p-4">
                                    <UserRoleForm userId={user.id} currentRole={user.role} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
                Total Users: {users.length}
            </div>
        </div>
    );
}

export default AdminUsersPage;
