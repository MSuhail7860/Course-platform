import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    return redirect("/search");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black space-y-4">
      <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">
        Welcome to Course Platform
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        Please sign in to access existing courses or create new ones.
      </p>
      <Link href="/api/auth/signin">
        <Button size="lg">
          Sign In
        </Button>
      </Link>
    </div>
  );
}
