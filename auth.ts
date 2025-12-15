import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // 1. Connects NextAuth to your Prisma Database
    adapter: PrismaAdapter(db),

    // 2. Use JWT session strategy (Required for Credentials provider)
    session: { strategy: "jwt" },

    // 3. Custom Login/Error pages
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },

    // 4. Callbacks: Attach User ID and Role to the Session
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                // We cast the string from DB to our specific Role types
                session.user.role = token.role as "ADMIN" | "TEACHER" | "STUDENT";
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            // Fetch the user from the database to get their Role
            const existingUser = await db.user.findUnique({
                where: { id: token.sub }
            });

            if (!existingUser) return token;

            // Assign the role to the token so it can be passed to the session
            token.role = existingUser.role as "ADMIN" | "TEACHER" | "STUDENT";

            return token;
        },
    },

    // 5. Merge configuration from auth.config.ts
    ...authConfig,

    // 6. Define Login Providers
    providers: [
        // Google Provider
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Email/Password Provider
        Credentials({
            async authorize(credentials) {
                const validatedFields = z.object({
                    email: z.string().email(),
                    password: z.string().min(1)
                }).safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    // --- CRITICAL FIX: Force lowercase lookup ---
                    // This fixes the issue where "User@test.com" cannot login as "user@test.com"
                    const user = await db.user.findUnique({
                        where: { email: email.toLowerCase() }
                    });

                    // Check if user exists and has a password (Google users might not have one)
                    if (!user || !user.password) return null;

                    // Verify Password
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user as any;
                }

                return null;
            }
        })
    ],
});
