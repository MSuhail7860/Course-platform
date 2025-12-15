import { auth } from "@/auth"; // or wherever your auth helper is
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const session = await auth();
  
  // Double-check: If a non-admin tries to type this URL manually, kick them out.
  if (session?.user?.role !== "ADMIN") {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-6">
        Admin Dashboard
      </h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example Stat Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>

        {/* You can add more cards here for Revenue, Courses, etc. */}
      </div>
    </div>
  );
}