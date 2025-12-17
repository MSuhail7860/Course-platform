import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "TEACHER" | "STUDENT";
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await db.user.findUnique({
                where: { id: token.sub }
            });

            if (!existingUser) return token;

            token.role = existingUser.role as "ADMIN" | "TEACHER" | "STUDENT";

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await db.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        return {
                            ...user,
                            role: user.role as "ADMIN" | "TEACHER" | "STUDENT"
                        };
                    }
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    }
})
