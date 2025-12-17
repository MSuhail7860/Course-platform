import { Suspense } from "react"; // 1. Import Suspense
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {/* 2. Wrap LoginForm in Suspense */}
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <LoginForm />
                </Suspense>

                <div className="mt-4 text-center text-sm">
                    <Link href="/auth/register" className="underline">
                        Don&apos;t have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;