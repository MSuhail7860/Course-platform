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
import { Badge } from "@/components/ui/badge"; // Assuming Badge exists or will perform fallback
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminCoursesPage = async () => {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            User: true,
        }
    });

    return ( 
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Courses ({courses.length})</h1>
            <div className="border rounded-md p-4 bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>{course.User.email || "Unknown"}</TableCell>
                                <TableCell>
                                    <span className={course.isPublished ? "text-green-600 font-bold" : "text-slate-500"}>
                                        {course.isPublished ? "Published" : "Draft"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {course.price ? `$${course.price}` : "Free"}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/teacher/courses/${course.id}`}>
                                        <Button variant="ghost" size="sm">
                                            Manage
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
     );
}
 
export default AdminCoursesPage;
