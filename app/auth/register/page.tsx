import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <RegisterForm />
                <div className="mt-4 text-center text-sm">
                    <Link href="/api/auth/signin" className="underline">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default RegisterPage;
